import { readFileSync, writeFileSync } from "fs";
import { ai, z } from "./genkit.js";
import { USERNAMES } from "./data.js";

const ReviewSchema = z.object({
  movieId: z.string().describe("the exact movie id"),
  username: z.string().describe("the username chosen from the list"),
  review: z
    .string()
    .describe("the text of the review in markdown format. can vary in length and style"),
  rating: z
    .number()
    .describe(
      "the rating as an integer from 0 to 10 (0 = 0 stars, 5 = 2.5 stars, 10 = 5 stars). the average of the ratings for the movie should approximately equal the reviewAvg from the movie data"
    ),
});

async function makeReviews() {
  const { movies }: { movies: any[] } = JSON.parse(
    readFileSync("generated-data/movies.json", { encoding: "utf8" })
  );

  let reviews: any[] = [];
  try {
    const parsedReviews = JSON.parse(
      readFileSync("generated-data/reviews.json", { encoding: "utf8" })
    );
    reviews = parsedReviews.reviews;
  } catch {}
  for (const movie of movies) {
    if (reviews.find((r) => r.movieId === movie.id)) {
      console.log("Skipping review generation for", movie.title);
    }

    const { output } = await ai.generate({
      prompt: `Generate 15 plausible reviews for the provided imaginary movie. The reviews should be in a distribution that overall roughly equals out to the average rating described. Some reviews should highlight the items called out in the consensus, but make sure to add some variety so they don't all sound the same. Use a variety of review length (min: two sentences, max: 3 paragraphs) and style (some people should be funny, some people should be analytical, etc).
      
For each review, choose an appropriate username (but DO NOT repeat the same username multiple times) from this list:
${USERNAMES.join(", ")}

Reviews may call out specific actors by name for their performance, good or bad (infer the actor's name based on the id in the role).

Overall remember that the goal is to create a set of plausible reviews that match the consensus and average rating without being overly similar to each other.

# Movie Data

${JSON.stringify(movie)}`,
      output: {
        schema: z.object({ reviews: z.array(ReviewSchema) }),
      },
    });

    reviews.push(...output!.reviews);
    writeFileSync("generated-data/reviews.json", JSON.stringify({ reviews }, null, 2), {
      encoding: "utf8",
    });
  }
}

makeReviews();
