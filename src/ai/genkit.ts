import { genkit, z } from "genkit";
import { gemini20Flash, vertexAI } from "@genkit-ai/vertexai";
import { dataConnectTools } from "@genkit-ai/firebase/beta/data-connect";
import { app } from "@/lib/firebase";

export const ai = genkit({
  plugins: [
    vertexAI({ projectId: "next25-movies", location: "us-central1" }),
    dataConnectTools({
      name: "db",
      configFile: "generated/tools.json",
      sdk: app,
    }),
  ],
  model: gemini20Flash,
});
export { z };

ai.defineFlow(
  {
    name: "test",
  },
  async () => {
    const { text } = await ai.generate({
      prompt: "Find me a highly-rated sci-fi movie from the 80's",
      tools: ["db/SearchReviews", "db/FilterMovies"],
    });
    return text;
  }
);
