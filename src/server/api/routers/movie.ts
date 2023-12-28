import { MovieSchema } from "~/lib/schemas";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "~/lib/db";
import { MovieTable } from "~/lib/drizzle/schema";
import { type Movie } from "~/lib/types";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const movieRouter = createTRPCRouter({
  add: protectedProcedure
    .input(MovieSchema)
    .mutation(async ({ input, ctx }) => {
      const movie: Movie = {
        ...input,
        publishingYear: input.publishYear,
        user_id: ctx.session.user.id,
      };

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
  update: protectedProcedure
    .input(MovieSchema)
    .mutation(async ({ input, ctx }) => {
      const movie: Movie = {
        id: input.id,
        posterLink: input.posterLink,
        title: input.title,
        publishingYear: input.publishYear,
        user_id: ctx.session.user.id,
      };

      try {
        await db
          .update(MovieTable)
          .set({ ...movie })
          .where(eq(MovieTable.id, input.id));

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
  getById: protectedProcedure.input(z.string()).query(async ({ input }) => {
    try {
      const movies = await db
        .select()
        .from(MovieTable)
        .where(eq(MovieTable.id, input));

      return movies[0];
    } catch (error) {
      throw new TRPCError({
        message: "Something went wrong",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),
});
