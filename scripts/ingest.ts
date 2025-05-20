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

import { readFileSync } from "fs";
import { USERNAMES } from "./data.js";
import { initializeApp } from "firebase-admin/app";
import { getDataConnect } from "firebase-admin/data-connect";
import { faker } from "@faker-js/faker";
import { deterministicUuid } from "./util.js";
const admin = initializeApp({ projectId: "next25-movies" });
const dcAdmin = getDataConnect(
	{ location: "us-central1", serviceId: "app" },
	admin,
);

function loadFile<T = any>(name: string) {
	return JSON.parse(
		readFileSync(`generated-data/${name}.json`, { encoding: "utf8" }),
	) as T;
}

const { movies } = loadFile("movies");
const { actors } = loadFile("actors");
const { reviews } = loadFile<{ reviews: any[] }>("reviews");

function jsonToGraphQL(obj: any, indent = ""): string {
	if (obj === null || obj === undefined) {
		return "null";
	}

	if (typeof obj === "string") {
		return `"${obj.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`; // Escape backslashes and quotes
	}

	if (typeof obj === "number" || typeof obj === "boolean") {
		return obj.toString();
	}

	if (Array.isArray(obj)) {
		const items = obj.map((item) => jsonToGraphQL(item, `${indent}  `));
		return `[${items.join(", ")}]`;
	}

	if (typeof obj === "object") {
		const fields = Object.entries(obj).map(([key, value]) => {
			const fieldValue = jsonToGraphQL(value, `${indent}  `);
			return `${indent}  ${key}: ${fieldValue}`;
		});
		return `{\n${fields.join(",\n")}\n${indent}}`;
	}

	return "null"; // Default case for unsupported types
}

async function populateMovies() {
	const moviesData = movies.map((movie: any) => ({
		id: movie.id,
		rating: movie.rating,
		title: movie.title,
		releaseDate: movie.releaseDate,
		genre: movie.genre,
		posterUrl: `https://storage.googleapis.com/next25-movies.firebasestorage.app/images/movies/${movie.id}.jpg`,
		description: movie.description,
		tags: movie.tags,
		// embedding_embed: {
		// 	model: "text-embedding-005",
		// 	text: `${movie.title}: ${movie.description}`,
		// },
	}));

	for (let i = 0; i < moviesData.length; i += 10) {
		await dcAdmin.executeGraphql(
			`mutation { movie_upsertMany(data: ${jsonToGraphQL(moviesData.slice(i, i + 10))}) }`,
		);
		console.log("finished batch", i, "through", i + 10);
	}
}

async function populateActors() {
	const data = actors.map((actor: any) => ({
		id: actor.id,
		name: actor.name,
		birthDate: actor.birthDate,
		imageUrl: `https://storage.googleapis.com/next25-movies.firebasestorage.app/images/actors/${actor.id}.jpg`,
	}));

	for (let i = 0; i < data.length; i += 10) {
		await dcAdmin.executeGraphql(
			`mutation { actor_upsertMany(data: ${jsonToGraphQL(data.slice(i, i + 10))}) }`,
		);
		console.log("finished batch", i, "through", i + 10);
	}
}

async function populateRoles() {
	const data: any[] = [];
	for (const movie of movies) {
		for (const role of movie.roles) {
			data.push({
				movieId: movie.id,
				actorId: role.actorId,
				character: role.character,
				description: role.description,
			});
		}
	}

	for (let i = 0; i < data.length; i += 30) {
		await dcAdmin.executeGraphql(
			`mutation { role_upsertMany(data: ${jsonToGraphQL(data.slice(i, i + 30))}) }`,
		);
		console.log("finished batch", i, "through", i + 30);
	}
}

async function populateUsers() {
	const data = USERNAMES.map((username) => ({ username, uid: username }));

	for (let i = 0; i < data.length; i += 30) {
		await dcAdmin.executeGraphql(
			`mutation { user_upsertMany(data: ${jsonToGraphQL(data.slice(i, i + 30))}) }`,
		);
		console.log("finished batch", i, "through", i + 30);
	}
	console.log("done");
}

async function populateReviews() {
	const data: any[] = [];
	const watchData: any[] = [];

	for (const review of reviews) {
		const watchTime = faker.date.recent({ days: 120 }).toISOString();
		data.push({
			id: deterministicUuid(review.username + review.movieId),
			userUid: review.username,
			review: review.review,
			rating: review.rating,
			movieId: review.movieId,
			reviewTime: watchTime,
			embedding_embed: { model: "text-embedding-005", text: review.review },
		});
		watchData.push({
			id: deterministicUuid("watch" + review.username + review.movieId),
			movieId: review.movieId,
			userUid: review.username,
			format:
				Math.random() > 0.5
					? "home"
					: Math.random() > 0.8
						? "theater"
						: "theater-premium",
			watchDate: watchTime,
			reviewId: deterministicUuid(review.username + review.movieId),
		});
	}

	for (let i = 0; i < data.length; i += 10) {
		console.log(data[i]);
		try {
			await dcAdmin.executeGraphql(
				`mutation {
          review_upsertMany(data: ${jsonToGraphQL(data.slice(i, i + 10))})
          watch_upsertMany(data: ${jsonToGraphQL(watchData.slice(i, i + 10))})
        }`,
			);

			console.log("finished batch", i, "through", i + 10);
		} catch (e) {
			console.log("ERROR WITH BATCH", i, "through", i + 10);
			console.error(e);
		}
	}
	console.log("done");
}

async function populateDatabase() {
	await populateMovies();
	// await populateActors();
	// await populateRoles();
	// await populateUsers();
	// await populateWatches();
	// await populateReviews();
}

populateDatabase();
