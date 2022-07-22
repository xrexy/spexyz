// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { redirectRouter } from "./redirect";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("redirects.", redirectRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
