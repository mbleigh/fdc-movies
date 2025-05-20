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

import { genkit, z } from "genkit/beta";
import { gemini20Flash, vertexAI } from "@genkit-ai/vertexai";
import { dataConnectTools } from "@genkit-ai/firebase/beta/data-connect";
import { app } from "@/lib/firebase";

export const ai = genkit({
  plugins: [
    vertexAI({ projectId: "next25-movies", location: "us-central1" }),
    dataConnectTools({
      name: "db",
      configFile: "generated/tools.json",
      firebaseApp: app,
    }),
  ],
  model: gemini20Flash,
  promptDir: "src/ai/prompts",
});

ai.defineInterrupt({
  name: "askQuestion",
  description: "use this tool to ask the user a clarifying question",
  inputSchema: z.object({
    question: z.string().describe("the text of the question to ask"),
    type: z
      .enum(["TEXT", "MULTIPLE_CHOICE", "MULTIPLE_SELECT"])
      .describe(
        "what type of question it is. MULTIPLE_CHOICE allows the user to select between one of a list of choices, MULTIPLE_SELECT allows the user to select multiple options from the list"
      ),
    choices: z
      .array(z.string())
      .optional()
      .describe(
        "if multiple choice, supply the choices here as a list of strings"
      ),
    allowWritein: z
      .boolean()
      .optional()
      .describe(
        "for MULTIPLE_CHOICE and MULTIPLE_SELECT questions, whether the user can write in their own custom response"
      ),
  }),
});

ai.defineInterrupt({
  name: "recommendMovies",
  description:
    "when you have enough information to recommend specific movie(s), use this function",
  inputSchema: z.object({
    recommendedMovies: z
      .array(
        z.object({
          id: z
            .string()
            .describe(
              "the exact id of the movie you are recommending. it will always be in lower-kebab-case-format"
            ),
          reason: z
            .string()
            .describe(
              "a 1-2 sentence summary of why you recommended this movie specifically. put a fun spin on it, pretend you're a movie buff and you are recommending this to a friend. DO NOT just repeat the user's query back to them, use details from the movie to sell your recommendation"
            ),
        })
      )
      .describe(
        "the movies you are recommending. unless there is only one movie that makes sense, recommend 3 movies. order from most recommended to least recommended"
      ),
  }),
});

export { z };
