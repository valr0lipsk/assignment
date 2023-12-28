import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const UserTable = pgTable("user", {
  id: uuid("id").notNull().primaryKey(),
  email: text("email").notNull(),
  password_hash: text("password_hash").notNull(),
});

export const MovieTable = pgTable("movie", {
  id: uuid("id").notNull().primaryKey(),
  title: text("title").notNull(),
  publishingYear: date("publishingYear").notNull().defaultNow(),
  posterLink: text("posterLink").notNull(),
});
