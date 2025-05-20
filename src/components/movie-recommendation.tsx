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

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { InfoIcon } from "@/components/ui/icons";
import { Star } from "lucide-react";
import MoviePoster, { Movie } from "@/components/movie-poster";

interface MovieRecommendationProps {
	movie: Movie;
	reason?: string;
	onSelectMovie?: (movie: Movie, reason?: string) => void;
}

export function MovieRecommendation({
	movie,
	reason,
	onSelectMovie,
}: MovieRecommendationProps) {
	// Extract release year from the date
	const releaseYear = new Date(movie.releaseDate).getFullYear();

	return (
		<div className="flex items-center gap-4 p-4 rounded-lg border border-border hover:shadow-md transition-shadow w-full">
			{/* Movie Poster */}
			<div className="w-[120px] flex-shrink-0">
				<MoviePoster movie={movie} size="small" variant="minimal" />
			</div>

			{/* Recommendation Text */}
			<div className="flex-1 space-y-2">
				<h3 className="font-medium text-lg">
					{movie.title}{" "}
					<span className="text-muted-foreground">({releaseYear})</span>
				</h3>
				<p className="text-sm text-muted-foreground">{reason || movie.genre}</p>

				<div className="flex items-center gap-2">
					{movie.stats?.avgRating && (
						<div className="flex items-center text-sm">
							<Star className="size-[14px] dark:text-yellow-300 text-orange-500 mr-1" />
							{(movie.stats.avgRating / 2).toFixed(1)}
						</div>
					)}
					<div className="flex flex-wrap gap-1">
						<Badge variant="outline" className="text-xs">
							{movie.genre}
						</Badge>
						<Badge variant="outline" className="text-xs">
							{movie.rating}
						</Badge>
					</div>
				</div>
			</div>

			{/* Watch It Button */}
			<Button
				className="flex-shrink-0"
				onClick={() => onSelectMovie && onSelectMovie(movie, reason)}
			>
				Watch It
			</Button>
		</div>
	);
}
