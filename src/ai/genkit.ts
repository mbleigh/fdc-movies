import { genkit, z } from "genkit";
import { vertexAI } from "@genkit-ai/vertexai";

export const ai = genkit({
  plugins: [vertexAI()],
});

export { z };
