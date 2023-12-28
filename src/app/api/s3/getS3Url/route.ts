import { type NextRequest } from "next/server";
import { s3 } from "~/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";

export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path")!;

  const command = new GetObjectCommand({
    Bucket: "mymoviesassign",
    Key: path,
  });

  const response = await s3.send(command);

  return new Response(response.Body?.transformToWebStream(), { status: 200 });
}
