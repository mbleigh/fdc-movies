/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
