import { recommenderFlow } from "@/ai/recommender";
import { appRoute } from "@genkit-ai/next";
import { firebaseContext } from "@genkit-ai/firebase/context";
import "@/lib/firebase-admin";
import { app } from "@/lib/firebase";

export const POST = appRoute(recommenderFlow, {
  contextProvider: firebaseContext({ signedIn: true, serverAppConfig: app }),
});
