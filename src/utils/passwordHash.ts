import { pbkdf2Sync } from "node:crypto";
import { env } from "~/env.mjs";

const saltKey = env.SALT_KEY;
const iterations = 10000;

export function hashPassword(pass: string) {
  const key = pbkdf2Sync(pass, saltKey, iterations, 64, "sha512");

  return key.toString("hex");
}

export function isMatchingPassword(pass: string, storedHash: string) {
  const hash = pbkdf2Sync(pass, saltKey, iterations, 64, "sha512");

  return hash.toString("hex") === storedHash;
}
