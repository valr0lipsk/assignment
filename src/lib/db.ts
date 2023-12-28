import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { env } from "~/env.mjs";

const client = new Pool({ connectionString: env.DATABASE_URL });

export const db = drizzle(client);
