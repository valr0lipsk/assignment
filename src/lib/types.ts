import { type InferSelectModel } from "drizzle-orm";
import { type MovieTable, type UserTable } from "./drizzle/schema";

export type User = InferSelectModel<typeof UserTable>;

export type Movie = InferSelectModel<typeof MovieTable>;
