import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "~/lib/s3";
import { TRPCError } from "@trpc/server";

export const s3Router = createTRPCRouter({
  getS3AnimationUploadUrl: protectedProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const command = new PutObjectCommand({
        Bucket: "mymoviesassign",
        Key: input,
        ContentType: "image/jpeg",
      });

      try {
        const url = await getSignedUrl(s3, command, { expiresIn: 60 });

        return url;
      } catch (error) {
        throw new TRPCError({
          message: "Something went wrong",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
