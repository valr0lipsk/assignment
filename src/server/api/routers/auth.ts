import { SignInSchema } from "~/lib/schemas";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { hashPassword } from "~/utils/passwordHash";

const authRouter = createTRPCRouter({
  register: publicProcedure.input(SignInSchema).mutation(({ input }) => {
    const dataToInsert = {
      id: crypto.randomUUID(),
      email: input.email,
      password_hash: hashPassword(input.password),
    };

    try {
    } catch (error) {}
  }),
});
