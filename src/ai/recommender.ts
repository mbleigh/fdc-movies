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

import { MessageSchema } from "genkit";
import { ai, z } from "./genkit";
import { getWatchHistory } from "@/lib/get-watch-history";

const recommenderPrompt = ai.prompt("recommender");

export const recommenderFlow = ai.defineFlow(
  {
    name: "recommender",
    inputSchema: z.object({
      messages: z.array(MessageSchema),
    }),
    outputSchema: z.array(MessageSchema),
  },
  async (input, { context }) => {
    const { messages } = await recommenderPrompt(
      {
        watchHistory: await getWatchHistory(context?.auth?.uid),
        now: new Date().toISOString(),
      },
      { messages: input.messages }
    );

    // only return new messages since the last call
    return messages.slice(input.messages.length + 1);
  }
);
