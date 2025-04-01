"use client";

/**
 * Movie Recommendations Display Component
 *
 * This component handles fetching and displaying movie recommendations
 * based on the recommendedMovies data from the AI's recommendMovies toolRequest.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MovieRecommendation } from "@/components/movie-recommendation";
import { useGetMovies } from "@app/data/react";
import type { GetMoviesData } from "@app/data";
import type { Movie } from "@/components/movie-poster";

// Interface for the recommended movie from the AI
interface RecommendedMovie {
	id: string;
	reason: string;
}

interface MovieRecommendationsDisplayProps {
	recommendedMovies: RecommendedMovie[];
	onRefinement: (refinementText: string) => Promise<void>;
	onReset: () => void;
	onSelectMovie?: (movie: Movie, reason?: string) => void;
}

export function MovieRecommendationsDisplay({
	recommendedMovies,
	onRefinement,
	onReset,
	onSelectMovie,
}: MovieRecommendationsDisplayProps) {
	// Extract movie IDs from the recommendations
	const movieIds = recommendedMovies.map((movie) => movie.id);

	// Fetch the movies using the useGetMovies hook
	const { data, isPending, isError } = useGetMovies({ ids: movieIds });

	// State for refinement input
	const [refinementText, setRefinementText] = useState("");

	// Handle refinement submission
	const handleRefinementSubmit = async (
		e: React.KeyboardEvent<HTMLInputElement>,
	) => {
		if (e.key === "Enter" && refinementText.trim()) {
			await onRefinement(refinementText);
			setRefinementText("");
		}
	};

	// Animation variants for recommendations
	const recommendationVariants = {
		hidden: { opacity: 0, x: 100 },
		visible: (custom: number) => ({
			opacity: 1,
			x: 0,
			transition: {
				delay: custom * 0.2,
				duration: 0.5,
				type: "spring",
				stiffness: 300,
				damping: 30,
			},
		}),
	};

	// If data is loading, show loading state
	if (isPending) {
		return (
			<div className="space-y-8">
				<Button variant="ghost" className="mb-4" onClick={onReset}>
					← Start over
				</Button>
				<h2 className="text-xl font-semibold">Loading recommendations...</h2>
				<div className="space-y-4 max-w-3xl mx-auto">
					{[1, 2, 3].map((index) => (
						<div
							key={index}
							className="h-32 bg-muted animate-pulse rounded-lg"
						/>
					))}
				</div>
			</div>
		);
	}

	// If there was an error fetching the movies
	if (isError) {
		return (
			<div className="space-y-8">
				<Button variant="ghost" className="mb-4" onClick={onReset}>
					← Start over
				</Button>
				<h2 className="text-xl font-semibold text-destructive">
					Error loading recommendations
				</h2>
				<p>
					Sorry, we couldn't load the movie recommendations. Please try again.
				</p>
			</div>
		);
	}

	// If no movies were found
	if (!data?.movies || data.movies.length === 0) {
		return (
			<div className="space-y-8">
				<Button variant="ghost" className="mb-4" onClick={onReset}>
					← Start over
				</Button>
				<h2 className="text-xl font-semibold">No recommendations available</h2>
				<p>Sorry, we couldn't find any movies matching your criteria.</p>
			</div>
		);
	}

	// Create a map of movies by ID for easy lookup
	const moviesById = new Map(
		data.movies.map((movie: GetMoviesData["movies"][0]) => [movie.id, movie]),
	);

	// Create a map of reasons by movie ID
	const reasonsById = new Map(
		recommendedMovies.map((rec) => [rec.id, rec.reason]),
	);

	return (
		<div className="space-y-8">
			<Button variant="ghost" className="mb-4" onClick={onReset}>
				← Start over
			</Button>

			<h2 className="text-xl font-semibold">
				Here are some movies you might enjoy:
			</h2>

			<div className="space-y-4 max-w-3xl mx-auto">
				{data.movies.map((movie: Movie, index: number) => {
					const reason = reasonsById.get(movie.id);

					return (
						<motion.div
							key={movie.id}
							variants={recommendationVariants}
							initial="hidden"
							animate="visible"
							custom={index} // Used for staggered animations
							className="w-full"
						>
							<MovieRecommendation
								movie={movie}
								reason={reason}
								onSelectMovie={onSelectMovie}
							/>
						</motion.div>
					);
				})}
			</div>

			<Card className="p-4 mt-4">
				<h3 className="text-lg font-medium mb-2">Want something different?</h3>
				<Input
					placeholder="Tell us more about what you're looking for..."
					className="mb-2"
					value={refinementText}
					onChange={(e) => setRefinementText(e.target.value)}
					onKeyDown={handleRefinementSubmit}
				/>
				<p className="text-sm text-muted-foreground">
					Press Enter to refine your recommendations
				</p>
			</Card>
		</div>
	);
}
