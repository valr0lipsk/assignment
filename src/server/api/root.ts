import { createTRPCRouter } from "~/server/api/trpc";
import { movieRouter } from "./routers/movie";
import { s3Router } from "./routers/s3";

export const appRouter = createTRPCRouter({
  movie: movieRouter,
  s3: s3Router,
});

export type AppRouter = typeof appRouter;
