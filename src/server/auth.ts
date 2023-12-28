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

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT, User {}
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"] &
      User;
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
  providers: [],
};

export const getServerAuthSession = () => getServerSession(authOptions);
