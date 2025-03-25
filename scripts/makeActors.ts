import { existsSync, readFileSync, writeFileSync } from "fs";
import { z } from "genkit";
import { ai } from "./genkit.js";
import { imagen3, imagen3Fast } from "@genkit-ai/vertexai";

// Convert a name to kebab-case format
function nameToKebabCase(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
}

function getRandomBirthdate(): string {
  const randomNumber = Math.random();
  let year: number;

  if (randomNumber < 0.05) {
    year = Math.floor(Math.random() * 11) + 1940;
  } else if (randomNumber < 0.15) {
    year = Math.floor(Math.random() * 10) + 1950;
  } else if (randomNumber < 0.25) {
    year = Math.floor(Math.random() * 10) + 1960;
  } else if (randomNumber < 0.4) {
    year = Math.floor(Math.random() * 10) + 1970;
  } else if (randomNumber < 0.75) {
    year = Math.floor(Math.random() * 10) + 1980;
  } else {
    year = Math.floor(Math.random() * 11) + 1990;
  }

  const month = Math.floor(Math.random() * 12) + 1;
  let day: number;
  const daysInMonth = new Date(year, month, 0).getDate(); // Get the number of days in the month

  day = Math.floor(Math.random() * daysInMonth) + 1;

  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  const formattedDay = day < 10 ? `0${day}` : `${day}`;

  return `${year}-${formattedMonth}-${formattedDay}`;
}

function generateFakeActorName(): string {
  const firstNames = [
    "Ethan",
    "Olivia",
    "Liam",
    "Emma",
    "Noah",
    "Ava",
    "William",
    "Sophia",
    "James",
    "Isabella",
    "Benjamin",
    "Mia",
    "Lucas",
    "Charlotte",
    "Henry",
    "Amelia",
    "Alexander",
    "Harper",
    "Samuel",
    "Evelyn",
    "Daniel",
    "Abigail",
    "Matthew",
    "Emily",
    "Joseph",
    "Elizabeth",
    "David",
    "Sofia",
    "Michael",
    "Ella",
    "Ryan",
    "Scarlett",
    "Andrew",
    "Victoria",
    "Gabriel",
    "Grace",
    "Joshua",
    "Chloe",
    "Owen",
    "Penelope",
    "Caleb",
    "Riley",
    "Nathan",
    "Layla",
    "Isaac",
    "Lily",
    "Eli",
    "Aurora",
    "Jack",
    "Hazel",
    "Finn",
    "Violet",
    "Aidan",
    "Stella",
    "Asher",
    "Luna",
    "Owen",
    "Eleanor",
    "Grayson",
    "Maya",
    "Wyatt",
    "Naomi",
    "Carter",
    "Alice",
    "Julian",
    "Aubrey",
    "Leo",
    "Natalie",
    "Jayden",
    "Claire",
    "Luke",
    "Addison",
    "Anthony",
    "Lucy",
    "Adrian",
    "Samantha",
    "Dylan",
    "Paisley",
    "Cole",
    "Willow",
    "Max",
    "Sadie",
    "Adam",
    "Ruby",
    "Connor",
    "Eva",
    "Theodore",
    "Skylar",
    "Owen",
    "Nora",
    "Sebastian",
    "Bella",
    "Hunter",
    "Hannah",
    "Henry",
    "Madelyn",
    "Charles",
    "Gianna",
    "Owen",
    "Serenity",
    "Wesley",
    "Leah",
    "Nicholas",
    "Savannah",
    "Cameron",
    "Brooklyn",
    "Thomas",
    "Zoe",
    "Josiah",
    "Stella",
    "Christian",
    "Audrey",
    "Aaron",
    "Anna",
    "Lincoln",
    "Allison",
    "Jonathan",
    "Genesis",
    "Adrian",
    "Emilia",
    "Christopher",
    "Katherine",
    "Jordan",
    "Ariana",
    "Robert",
    "Madeline",
    "Brandon",
    "Kennedy",
    "Angel",
    "Eleanor",
  ];

  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Wilson",
    "Anderson",
    "Thomas",
    "Taylor",
    "Moore",
    "Jackson",
    "Martin",
    "Lee",
    "Perez",
    "Thompson",
    "White",
    "Harris",
    "Sanchez",
    "Clark",
    "Lewis",
    "Robinson",
    "Walker",
    "Young",
    "Allen",
    "King",
    "Wright",
    "Scott",
    "Green",
    "Baker",
    "Adams",
    "Nelson",
    "Hill",
    "Rivera",
    "Campbell",
    "Mitchell",
    "Roberts",
    "Carter",
    "Phillips",
    "Evans",
    "Turner",
    "Parker",
    "Collins",
    "Edwards",
    "Stewart",
    "Flores",
    "Morris",
    "Nguyen",
    "Murphy",
    "Cook",
    "Rogers",
    "Morgan",
    "Peterson",
    "Cooper",
    "Reed",
    "Bailey",
    "Bell",
    "Gomez",
    "Kelly",
    "Howard",
    "Ward",
    "Cox",
    "Diaz",
    "Richardson",
    "Wood",
    "Watson",
    "Brooks",
    "Bennett",
    "Gray",
    "James",
    "Reyes",
    "Cruz",
    "Hughes",
    "Price",
    "Myers",
    "Long",
    "Foster",
    "Sanders",
    "Ross",
    "Morales",
    "Powell",
    "Sullivan",
    "Kennedy",
    "Ramirez",
    "Chapman",
    "Jennings",
    "Chambers",
    "Wilkins",
    "Benson",
    "Nichols",
    "Atkinson",
    "Bradshaw",
    "Crawford",
    "Hamilton",
    "Davidson",
    "Reynolds",
    "Johnston",
    "Marshall",
    "Weber",
    "Ellis",
    "Gibson",
    "Hayes",
    "Porter",
    "Wallace",
    "Griffin",
    "Montgomery",
    "Saunders",
    "Weaver",
    "Harrison",
    "Tucker",
    "Freeman",
    "Simpson",
    "Gardner",
    "Jasper",
    "Aurora",
    "Silas",
    "Hazel",
    "Atticus",
    "Thea",
    "Caspian",
    "Juniper",
    "Finnian",
    "Wren",
    "Lysander",
    "Nova",
    "Elias",
    "Sage",
    "Milo",
    "Ivy",
    "Arthur",
    "Willow",
    "Felix",
    "Skye",
    "Hugo",
    "Luna",
    "Oscar",
    "Freya",
    "Leo",
    "Clara",
    "Theodore",
    "Esme",
    "Henry",
    "Beatrice",
    "Oliver",
    "Florence",
    "Jasper",
    "Elsie",
    "Frederick",
    "Ada",
    "Vincent",
    "Rose",
    "Edward",
    "Violet",
    "Walter",
    "Eleanor",
    "George",
    "Alice",
    "William",
    "Mabel",
    "Louis",
    "Olive",
    "Albert",
    "Agnes",
    "Ernest",
    "Edith",
    "Alfred",
    "Martha",
    "Harold",
    "Ethel",
    "Clarence",
    "Gertrude",
    "Raymond",
    "Gladys",
    "Bernard",
    "Mildred",
    "Cecil",
    "Doris",
    "Eugene",
    "Lillian",
    "Clifford",
    "Margaret",
    "Stanley",
    "Ruth",
    "Melvin",
    "Helen",
    "Leroy",
    "Dorothy",
    "Floyd",
    "Frances",
    "Marvin",
    "Shirley",
    "Dwight",
    "Patricia",
    "Earl",
    "Betty",
    "Lloyd",
    "Barbara",
    "Howard",
    "Jean",
    "Russell",
    "Sandra",
    "Donald",
    "Carol",
    "Eugene",
    "Judith",
    "Clarence",
    "Lois",
    "Roy",
    "Beverly",
    "Ralph",
    "Marilyn",
    "Dale",
    "Nancy",
    "Norman",
    "Brenda",
    "Curtis",
    "Sharon",
    "Roger",
    "Linda",
    "Glenn",
    "Pamela",
    "Willard",
    "Debra",
    "Franklin",
    "Kathleen",
    "Harvey",
    "Angela",
    "Cecil",
    "Theresa",
    "Virgil",
    "Carolyn",
    "Jesse",
    "Michelle",
    "Clifford",
    "Diane",
    "Calvin",
    "Jane",
    "Byron",
    "Susan",
    "Spencer",
    "Donna",
    "Garrett",
    "Joyce",
    "Montgomery",
    "Sinclair",
    "Everett",
    "Sterling",
    "Vaughan",
    "Whitlock",
    "Fairchild",
    "Hawthorne",
    "Livingston",
    "Blackwood",
    "Chandler",
    "Fitzgerald",
    "Weston",
    "Eastwood",
    "Northrop",
    "Southgate",
    "Cunningham",
    "Bancroft",
    "Pennington",
    "Ashworth",
    "Wellington",
    "Thorne",
    "Sheridan",
    "Clayton",
    "Farrell",
    "Donovan",
    "O'Connell",
    "McAllister",
    "Fitzwilliam",
    "Sinclair",
    "Hawkins",
    "Armstrong",
    "Wallace",
    "Reynolds",
    "Grayson",
    "Sullivan",
    "Kennedy",
    "Marshall",
    "Harrison",
    "Andrews",
    "Bishop",
    "Knight",
    "Foster",
    "Russell",
    "Spencer",
    "Brooks",
    "Jenkins",
    "Perry",
    "Murray",
    "Dixon",
    "Hayes",
    "Gibson",
    "Grant",
    "Fisher",
    "Dean",
    "Gardner",
    "Stephens",
    "Cole",
    "Arnold",
    "Graham",
    "Lawson",
    "Walters",
    "Chapman",
    "Ferguson",
    "Atkinson",
    "Burton",
    "Saunders",
    "Newman",
    "Jennings",
    "Harvey",
    "Nicholson",
    "Woodward",
    "Davidson",
    "Hamilton",
    "Jefferson",
    "Lincoln",
    "Madison",
    "Monroe",
    "Washington",
    "Adams",
    "Jackson",
    "Van Buren",
    "Tyler",
    "Polk",
    "Taylor",
    "Fillmore",
    "Pierce",
    "Buchanan",
    "Lincoln",
    "Johnson",
    "Grant",
    "Hayes",
    "Garfield",
    "Arthur",
    "Cleveland",
    "Harrison",
    "Cleveland",
    "McKinley",
    "Roosevelt",
    "Taft",
    "Wilson",
    "Harding",
    "Coolidge",
    "Hoover",
    "Roosevelt",
    "Truman",
    "Eisenhower",
    "Kennedy",
    "Johnson",
    "Nixon",
    "Ford",
    "Carter",
    "Reagan",
    "Bush",
    "Clinton",
    "Bush",
    "Obama",
    "Trump",
    "Biden",
    "Harris",
    "Jefferson",
    "Franklin",
    "Hamilton",
    "Madison",
    "Monroe",
    "Adams",
    "Quincy",
    "Jackson",
    "Calhoun",
    "Clay",
  ];

  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${randomFirstName} ${randomLastName}`;
}

function generateActors() {
  const actors: { id: string; birthDate: string; name: string }[] = [];
  const existingIds = new Set<string>();

  // Continue generating actors until we have 1000 unique ones
  while (actors.length < 1000) {
    const name = generateFakeActorName();
    const id = nameToKebabCase(name);

    // Skip this name if its kebab-case ID already exists
    if (!existingIds.has(id)) {
      existingIds.add(id);
      actors.push({
        id,
        birthDate: getRandomBirthdate(),
        name,
      });
    }
  }

  // Log a sample of actors with their new IDs
  console.log(actors.slice(0, 10));
  writeFileSync("generated-data/actors.json", JSON.stringify({ actors }, null, 2), {
    encoding: "utf8",
  });
}

async function describeActors() {
  const { actors } = JSON.parse(readFileSync("generated-data/actors.json", { encoding: "utf8" }));
  const describedActors: any[] = [];

  for (let i = 0; i <= 950; i += 50) {
    const batch = actors.slice(i, i + 50);
    const { output } = await ai.generate({
      prompt: `For the provided list of imaginary movie actors, provide a short single-sentence description of their physical appearance in the year 2025 including ethnicity, hair style/color, and expression.\n\n${JSON.stringify(
        batch
      )}`,
      output: {
        schema: z.object({
          actors: z.array(z.object({ id: z.string(), name: z.string(), description: z.string() })),
        }),
      },
    });
    describedActors.push(output);
    writeFileSync(
      "generated-data/actors-described.json",
      JSON.stringify({ actors: describedActors }),
      { encoding: "utf8" }
    );
    console.log("described actors", i, "through", i + 50);
  }
}

function writePngFromDataUri(dataUri: string, filePath: string) {
  try {
    // Check if the data URI starts with the correct prefix for PNG
    if (!dataUri.startsWith("data:image/png;base64,")) {
      throw new Error("Invalid data URI format. Expected a PNG image in base64 encoding.");
    }

    // Extract the base64 encoded data
    const base64Data = dataUri.split(",")[1];

    // Decode the base64 data into a Buffer
    const buffer = Buffer.from(base64Data, "base64");

    // Write the buffer to a PNG file
    writeFileSync(filePath, buffer);

    console.log(`PNG file successfully written to: ${filePath}`);
  } catch (error) {
    console.error("Error writing PNG file:", error);
    throw error;
  }
}

import { GoogleGenAI, PersonGeneration } from "@google/genai";

async function generateActorImages() {
  const { actors } = JSON.parse(
    readFileSync("generated-data/actors-described.json", { encoding: "utf8" })
  );
  for (const actor of actors) {
    if (existsSync("generated-data/actors/" + actor.id + ".png")) continue;
    const photoType =
      Math.random() > 0.5
        ? "A color professional actor headshot, of "
        : Math.random() > 0.5
        ? "A still frame from a Hollywood movie of "
        : "A publicity photo from a public event of ";

    const genai = new GoogleGenAI({
      vertexai: true,
      project: "bleigh-genkit-test",
      location: "us-central1",
    });
    try {
      const response = await genai.models.generateImages({
        model: "imagen-3.0-fast-generate-001",
        prompt: `${photoType}${actor.description}`,
        config: {
          numberOfImages: 1,
          includeRaiReason: true,
          aspectRatio: "1:1",
          personGeneration: PersonGeneration.ALLOW_ALL,
        },
      });

      if (response.generatedImages?.[0]?.image?.imageBytes) {
        writeFileSync(
          `generated-data/actors/${actor.id}.png`,
          Buffer.from(response.generatedImages![0]!.image!.imageBytes!, "base64")
        );
      } else {
        console.error(`${actor.id}:`, `${photoType}${actor.description}`);
        console.error("NO IMAGE. RESPONSE:", response);
      }
    } catch (e) {
      console.error("Error with", actor.id, "continuing");
      console.error(e.message);
      continue;
    }
  }
}

generateActorImages();
