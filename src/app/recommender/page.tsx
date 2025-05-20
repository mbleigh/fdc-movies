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

"use client";

import MoviePoster from "@/components/movie-poster";
import { MovieRecommender } from "@/components/movie-recommender";
import { ThemeToggle } from "@/components/theme-toggle";
import { dc } from "@/lib/firebase";
import { WatchHistoryPageData } from "@app/data";
import { useWatchHistoryPage } from "@app/data/react";

export default function RecommenderPage() {
	const { data: watchHistoryData } = useWatchHistoryPage(dc, { limit: 4 });
	const recentMovies: WatchHistoryPageData["watches"][number]["movie"][] =
		watchHistoryData?.watches.map(
			(watch: WatchHistoryPageData["watches"][number]) => watch.movie,
		);

	return (
		<main className="container mx-auto py-10 px-4 md:px-6 min-h-screen">
			{recentMovies && <MovieRecommender recentMovies={recentMovies} />}
		</main>
	);
}
