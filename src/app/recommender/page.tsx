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
