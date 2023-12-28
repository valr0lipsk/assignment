import { SignInSchema } from "~/lib/schemas";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { hashPassword, isMatchingPassword } from "~/utils/passwordHash";
import { TRPCError } from "@trpc/server";
import { db } from "~/lib/db";
import { UserTable } from "~/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { type User } from "~/lib/types";

export const authRouter = createTRPCRouter({
  signIn: publicProcedure.input(SignInSchema).mutation(async ({ input }) => {
    try {
      const userFromDb = await db
        .select()
        .from(UserTable)
        .where(eq(UserTable.email, input.email));

      if (userFromDb[0]) {
        if (isMatchingPassword(input.password, userFromDb[0].password_hash))
          return userFromDb[0];

        throw new TRPCError({
          message: "Wrong credentials",
          code: "INTERNAL_SERVER_ERROR",
        });
      }

      const dataToInsert: User = {
        ...input,
        id: crypto.randomUUID(),
        password_hash: hashPassword(input.password),
      };

      const createdUser = await db
        .insert(UserTable)
        .values(dataToInsert)
        .returning({
          id: UserTable.id,
          email: UserTable.email,
          passwordHash: UserTable.password_hash,
        });

      return createdUser[0];
    } catch (error) {
      if (error instanceof TRPCError)
        throw new TRPCError({
          message: error.message,
          code: "INTERNAL_SERVER_ERROR",
        });

      throw new TRPCError({
        message: "Something went wrong",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),
});
