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

import MoviePoster from "@/components/movie-poster";
import MoviePosterPlaceholder from "@/components/movie-poster-placeholder";
import Review from "@/components/review";
import { dc } from "@/lib/firebase";
import { homePage } from "@app/data";

export default async function Home() {
	const result = await homePage(dc);
	const topRated = result.data.topMovies.map((m) => m.movie!);
	const { recentReviews, newReleases } = result.data;

	return (
		<div className="max-w-3xl mx-auto">
			<h2 className="text-2xl font-bold my-4">New Releases</h2>
			<div className="grid grid-cols-4 gap-3">
				{newReleases.map((movie) => (
					<MoviePoster movie={movie} key={movie.id} />
				))}
			</div>
			<h2 className="text-2xl font-bold my-4">Top Rated Movies</h2>
			<div className="grid grid-cols-5 gap-2">
				{topRated.map((movie) => (
					<MoviePoster movie={movie} key={movie.id} size="small" />
				))}
			</div>
			<h2 className="text-2xl font-bold my-4">Recent Reviews</h2>
			<div className="space-y-4">
				{recentReviews.map((review, index) => (
					<Review
						key={index}
						user={{ username: review.user.username }}
						movie={review.movie}
						rating={review.rating}
						reviewTime={review.reviewTime}
						reviewText={review.review || ""}
					/>
				))}
			</div>
		</div>
	);
}
