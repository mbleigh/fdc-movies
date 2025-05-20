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

import { recommenderFlow } from "@/ai/recommender";
import { appRoute } from "@genkit-ai/next";
import { firebaseContext } from "@genkit-ai/firebase/context";
import "@/lib/firebase-admin";
import { app } from "@/lib/firebase";

export const POST = appRoute(recommenderFlow, {
  contextProvider: firebaseContext({ signedIn: true, serverAppConfig: app }),
});
