import { type InferSelectModel } from "drizzle-orm";
import { type UserTable } from "./drizzle/schema";

export type User = InferSelectModel<typeof UserTable>;
