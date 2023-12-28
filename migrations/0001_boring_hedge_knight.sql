ALTER TABLE "movie" ALTER COLUMN "publishingYear" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "movie" ALTER COLUMN "publishingYear" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "movie" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "movie" ADD CONSTRAINT "movie_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
