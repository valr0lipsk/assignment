CREATE TABLE IF NOT EXISTS "movie" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"publishingYear" date DEFAULT now() NOT NULL,
	"posterLink" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL
);
