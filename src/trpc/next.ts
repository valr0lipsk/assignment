import { createTRPCNext } from "@trpc/next";
import { httpBatchLink } from "@trpc/react-query";
import { getBaseUrl } from "./shared";
import { type AppRouter } from "~/server/api/root";

export const trpcNext = createTRPCNext<AppRouter>({
  config() {
    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 10 * 60 * 1000,
            refetchOnWindowFocus: false,
            retry: false,
          },
          mutations: {
            onError(error: unknown) {
              console.error(error);
            },
          },
        },
      },

      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    };
  },

  ssr: false,
});
