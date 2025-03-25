import * as crypto from "crypto";

export function deterministicUuid(inputString: string): string {
  const hash = crypto.createHash("sha256");
  hash.update(inputString);
  const hashBytes = hash.digest();

  // Format the hash bytes into a UUID-like string
  const uuid = [
    hashBytes.slice(0, 4).toString("hex"),
    hashBytes.slice(4, 6).toString("hex"),
    "4" + hashBytes.slice(6, 7).toString("hex").substring(1, 3),
    ((hashBytes[8] & 0x3f) | 0x80).toString(16).padStart(2, "0") +
      hashBytes.slice(9, 10).toString("hex").substring(0, 2),
    hashBytes.slice(10, 16).toString("hex"),
  ].join("-");

  return uuid;
}
