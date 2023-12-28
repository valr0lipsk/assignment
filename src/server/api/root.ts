import { createTRPCRouter } from "~/server/api/trpc";
import { movieRouter } from "./routers/movie";
import { s3Router } from "./routers/s3";
import { authRouter } from "./routers/auth";

export const appRouter = createTRPCRouter({
  movie: movieRouter,
  s3: s3Router,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
