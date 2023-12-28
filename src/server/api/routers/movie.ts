import { MovieSchema } from "~/lib/schemas";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "~/lib/db";
import { MovieTable } from "~/lib/drizzle/schema";
import { type Movie } from "~/lib/types";
import { eq } from "drizzle-orm";

export const movieRouter = createTRPCRouter({
  add: protectedProcedure
    .input(MovieSchema)
    .mutation(async ({ input, ctx }) => {
      const movie: Movie = {
        ...input,
        publishingYear: input.publishYear,
        user_id: ctx.session.user.id,
      };

      console.log(movie, ctx.session.user);
      try {
        await db.insert(MovieTable).values(movie);

        return true;
      } catch (error) {
        throw new TRPCError({
          message: "Something went wrong",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      const movies = await db
        .select()
        .from(MovieTable)
        .where(eq(MovieTable.user_id, ctx.session.user.id));

      return movies;
    } catch (error) {
      throw new TRPCError({
        message: "Something went wrong",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),
});
