import { MessageSchema } from "genkit";
import { ai, z } from "./genkit";
import { detailedWatchHistory } from "@app/data";
import { getDataConnect } from "firebase/data-connect";
import { dc } from "@/lib/firebase";
import { FirebaseServerApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { dcAdmin, gql } from "@/lib/firebase-admin";
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
      { watchHistory: await getWatchHistory(context?.auth?.uid) },
      { messages: input.messages }
    );

    // only return new messages since the last call
    return messages.slice(input.messages.length + 1);
  }
);
