import vertexAI, { gemini20Flash001 } from "@genkit-ai/vertexai";
import { genkit, z } from "genkit";

export const ai = genkit({
  plugins: [vertexAI()],
  model: gemini20Flash001,
});

export { z };
