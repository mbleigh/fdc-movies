import { initializeApp, getApps } from "firebase-admin/app";
import { getDataConnect } from "firebase-admin/data-connect";

export const admin =
  getApps()[0] || initializeApp({ projectId: "next25-movies" });

export const dcAdmin = getDataConnect(
  { location: "us-central1", serviceId: "app" },
  admin
);

export function gql(strings: TemplateStringsArray, ...values: any[]): string {
  // Start with the first static string part.
  // Then, for each subsequent value, append it followed by the next static string part.
  let result = strings[0];
  for (let i = 0; i < values.length; i++) {
    result += values[i];
    result += strings[i + 1];
  }
  return result;
}
