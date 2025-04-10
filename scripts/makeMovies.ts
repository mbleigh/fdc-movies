import { existsSync, readFileSync, writeFileSync } from "fs";
import { z } from "genkit";
import { ai } from "./genkit.js";
import { GoogleGenAI, PersonGeneration } from "@google/genai";

const GENRES = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Thriller",
  "Sci-Fi",
  "Horror",
  "Rom-Com",
  "Mystery",
  "Western",
  "Animation",
  "Musical",
];

function getRandomReleaseDate(): string {
  const randomNumber = Math.random();
  let year: number;

  if (randomNumber < 0.05) {
    year = Math.floor(Math.random() * 11) + 1970;
  } else if (randomNumber < 0.15) {
    year = Math.floor(Math.random() * 10) + 1980;
  } else if (randomNumber < 0.35) {
    year = Math.floor(Math.random() * 10) + 1980;
  } else if (randomNumber < 0.55) {
    year = Math.floor(Math.random() * 10) + 2000;
  } else if (randomNumber < 0.9) {
    year = Math.floor(Math.random() * 10) + 2010;
  } else {
    year = Math.floor(Math.random() * 4) + 2020;
  }

  const month = Math.floor(Math.random() * 12) + 1;
  let day: number;
  const daysInMonth = new Date(year, month, 0).getDate(); // Get the number of days in the month

  day = Math.floor(Math.random() * daysInMonth) + 1;

  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  const formattedDay = day < 10 ? `0${day}` : `${day}`;

  return `${year}-${formattedMonth}-${formattedDay}`;
}

const { actors } = JSON.parse(
  readFileSync("generated-data/actors-full.json", { encoding: "utf8" })
);

function generateMovieStub(genre: string) {
  const releaseDate = getRandomReleaseDate();

  // filter actors to birth dates at least 20 years before releaseDate
  const releaseYear = parseInt(releaseDate.substring(0, 4), 10);
  const minimumBirthYear = releaseYear - 20;

  // Define the Actor type based on the structure we need
  type Actor = {
    id: string;
    name: string;
    birthDate: string;
    description: string;
  };

  // Filter actors who would be at least 20 years old at movie release
  const eligibleActors = actors.filter((actor: Actor) => {
    const birthYear = parseInt(actor.birthDate.substring(0, 4), 10);
    return birthYear <= minimumBirthYear;
  });

  // pick four actors at random
  const movieActors: any[] = [];

  // Make sure we have enough eligible actors
  if (eligibleActors.length >= 4) {
    // Fisher-Yates shuffle algorithm to randomly pick 4 actors
    const shuffled = [...eligibleActors];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Take the first 4 actors
    for (let i = 0; i < 4; i++) {
      movieActors.push({
        actorId: shuffled[i].id,
        name: shuffled[i].name,
      });
    }
  }

  return {
    genre,
    releaseDate,
    cast: movieActors,
  };
}

const MovieSchema = z.object({
  title: z.string().describe("the title of the movie"),
  releaseDate: z
    .string()
    .describe("the release date of the movie in YYYY-MM-DD form"),
  description: z.string().describe("a 2-3 sentence description of the movie"),
  genre: z.string().describe("the genre of the movie"),
  tags: z.array(z.string()).describe("relevant tags for the movie"),
  posterDescription: z
    .string()
    .describe(
      "a description of the movie poster for this movie. describe it as if prompting an image generator, e.g. 'A 1970s-style movie poster for \"Movie Name\" featuring...'. Do not include any actor names or sensitive words that might trigger a safety filter in the description."
    ),
  roles: z
    .array(
      z.object({
        actorId: z.string().describe("the id of the actor for this role"),
        character: z.string().describe("the character name of the role"),
        description: z
          .string()
          .describe("a one-sentence description of the character"),
      })
    )
    .describe("the major roles in the movie, create one for each actor"),
});

const movies: any[] = [];

async function generateMovies() {
  for (const genre of GENRES) {
    const stubs: any[] = [];
    for (let i = 0; i < 20; i++) stubs.push(generateMovieStub(genre));
    const { output } = await ai.generate({
      prompt: `Generate 20 movies in the ${genre} genre by taking the provided genres, release dates, and actors and filling them out with additional information. Make sure to keep in mind the time period when the movie was released when describing the poster.

Keep in mind that descriptions of actors are for 2025, so think about how old the actor would be in when the movie is set when creating roles.

${JSON.stringify(stubs, null, 2)}`,
      output: {
        schema: z.object({
          movies: z.array(MovieSchema),
        }),
      },
    });

    movies.push(...(output?.movies || []));
    writeFileSync(
      "generated-data/movies.json",
      JSON.stringify({ movies }, null, 2),
      {
        encoding: "utf8",
      }
    );
    console.log("Generated 20", genre, "movies.");
  }
}

function nameToKebabCase(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
}

async function generateMoviePosters() {
  const { movies } = JSON.parse(
    readFileSync("generated-data/movies.json", { encoding: "utf8" })
  );
  for (const movie of movies) {
    const movieId = nameToKebabCase(movie.title);
    if (existsSync(`generated-data/movies/${movieId}.png`)) continue;
    const genai = new GoogleGenAI({
      vertexai: true,
      project: "bleigh-genkit-test",
      location: "us-central1",
    });
    try {
      const response = await genai.models.generateImages({
        model: "imagen-3.0-generate-001",
        prompt: `Movie poster for "${movie.title}" that includes the title on the image. ${movie.posterDescription}`,
        config: {
          numberOfImages: 1,
          includeRaiReason: true,
          aspectRatio: "3:4",
          personGeneration: PersonGeneration.ALLOW_ALL,
        },
      });

      if (response.generatedImages?.[0]?.image?.imageBytes) {
        writeFileSync(
          `generated-data/movies/${movieId}.png`,
          Buffer.from(
            response.generatedImages![0]!.image!.imageBytes!,
            "base64"
          )
        );
      } else {
        console.error(`${movieId}:`, `${movie.posterDescription}`);
        console.error("NO IMAGE. RESPONSE:", response);
        continue;
      }
    } catch (e) {
      console.error("Error with", movie.id, "continuing");
      console.error((e as any).message);
      continue;
    }
    console.log("Generated poster for", movie.title);
  }
}

async function generateRatingsAndConsensus() {
  const { movies }: { movies: { id: string; [other: string]: any }[] } =
    JSON.parse(
      readFileSync("generated-data/movies.json", { encoding: "utf8" })
    );

  const pendingMovies = movies.filter(
    (m) => !m.rating || !m.reviewAvg || !m.reviewConsensus
  );
  for (let i = 0; i < pendingMovies.length; i += 20) {
    const movieBatch = pendingMovies.slice(i, i + 20);

    const { output } = await ai.generate({
      prompt: `For each imaginary movie listed below, you are going to assign it a rating, an average review score, and a 'review consensus' that describes the aspects of the movie that lead it to receive its average score.
  
Use a distribution of scores -- most movies should be in the middle ranges but create at least two high and one very low scores.

# Example Review Consensus

Avg. Score: 8.2
Consensus: A mesmerizing movie anchored by a standout lead performance and a gripping story.

Avg. Score: 2.5
Consensus: Cringeworthy jokes fall flat on top of a script that feels trite and unpleasant.

Avg. Score: 6.7
Consensus: A fun adventure for those who are game, held back by sub-par visual effects.

The above are just examples, think about a wide variety of possible consensus feedback.

# Movie Data
  
  ${JSON.stringify(movieBatch)}`,
      output: {
        schema: z.object({
          movies: z.array(
            z.object({
              id: z.string().describe("the id of the movie"),
              rating: z.enum(["G", "PG", "PG-13", "R"]),
              reviewAvg: z
                .number()
                .describe(
                  "a number between 0.0 (zero stars) and 10.0 (5 stars) representing the average review rating of this movie"
                ),
              reviewConsensus: z
                .string()
                .describe(
                  "the consensus opinion of the reviewers (tone should match the reviewAvg score)"
                ),
            })
          ),
        }),
      },
    });

    output?.movies.forEach((m) => {
      const movie = movies.find((mo) => mo.id === m.id)!;
      if (!movie) {
        console.log("NO MOVIE:", m.id);
        return;
      }
      movie.rating = m.rating;
      movie.reviewAvg = m.reviewAvg;
      movie.reviewConsensus = m.reviewConsensus;
      console.log(`${m.id}: ${m.reviewAvg}/10`);
    });
    writeFileSync(
      "generated-data/movies.json",
      JSON.stringify({ movies }, null, 2),
      {
        encoding: "utf8",
      }
    );
  }
}

generateRatingsAndConsensus();
