import { MovieSchema } from "~/lib/schemas";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "~/lib/db";
import { MovieTable } from "~/lib/drizzle/schema";

export const movieRouter = createTRPCRouter({
  add: protectedProcedure
    .input(MovieSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        await db.insert(MovieTable).values(input);

        return true;
      } catch (error) {
        throw new TRPCError({
          message: "Something went wrong",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
