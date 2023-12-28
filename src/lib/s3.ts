import { S3 } from "@aws-sdk/client-s3";
import type { AwsCredentialIdentity, Provider } from "@aws-sdk/types";
import { env } from "~/env.mjs";

const getCredentials = ():
  | AwsCredentialIdentity
  | Provider<AwsCredentialIdentity> => {
  return {
    accessKeyId: env.AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY ?? "",
  };
};

export const s3 = new S3({
  region: env.AWS_SSO_REGION,
  credentials: getCredentials(),
});
