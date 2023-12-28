import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { db } from "~/lib/db";

// workaround to migrate db

// eslint-disable-next-line @typescript-eslint/require-await
export async function GET() {
  void (() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    migrate(db, { migrationsFolder: "migrations" });
  })();
  return new Response();
}
