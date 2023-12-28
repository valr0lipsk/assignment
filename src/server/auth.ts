import { type DefaultJWT } from "@auth/core/jwt";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { env } from "~/env.mjs";
import { db } from "~/lib/db";
import { type User } from "~/lib/types";
import CredentialsProvider from "next-auth/providers/credentials";
import { api } from "~/trpc/server";
import { eq } from "drizzle-orm";
import { UserTable } from "~/lib/drizzle/schema";

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT, User {}
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & User;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  secret: env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signIn",
  },
  session: {
    strategy: "jwt",
    updateAge: 30,
  },
  callbacks: {
    async session({ session }) {
      if (session.user && session.user.email) {
        const usersFromDB = await db
          .select()
          .from(UserTable)
          .where(eq(UserTable.email, session.user.email));

        if (usersFromDB[0]) session.user = usersFromDB[0] as User;
      }

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const user = await api.auth.signIn.mutate({ email, password });

          console.log(user);

          if (user) {
            return user;
          }

          return null;
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
