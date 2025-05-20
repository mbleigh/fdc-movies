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

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Movie poster component that can render in minimal or default variant
// Minimal variant only shows the poster image
// Default variant shows poster with rating and release year

export interface Movie {
	id: string;
	title: string;
	rating: string;
	posterUrl: string;
	releaseDate: string;
	genre: string;
	stats?: {
		avgRating?: number | null;
		watchCount?: number | null;
		reviewCount?: number | null;
	};
}

export interface MoviePosterProps {
	movie: Movie;
	variant?: "default" | "minimal";
	size?: "small" | "medium" | "full";
	className?: string;
}

export default function MoviePoster({
	movie,
	variant = "default",
	size = "medium",
	className,
}: MoviePosterProps) {
	// Extract release year from the date
	const releaseYear = new Date(movie.releaseDate).getFullYear();

	function urlFromSize(
		posterUrl: string,
		size: "small" | "medium" | "full" = "medium",
	) {
		switch (size) {
			case "small":
				return posterUrl.replace(".jpg", "-300x400.jpg");
			case "medium":
				return posterUrl.replace(".jpg", "-600x800.jpg");
			default:
				return posterUrl.replace(".jpg", "-300x400.jpg");
		}
	}

	return (
		<Link href={`/movies/${movie.id}`}>
			<div className="relative aspect-[3/4] w-full">
				<Image
					src={urlFromSize(movie.posterUrl, size)}
					alt={`${movie.title} poster`}
					fill
					className={cn(
						"object-cover border border-border",
						size === "small" ? "rounded" : "rounded-lg",
					)}
				/>

				{variant === "default" && movie.stats?.avgRating && (
					<div className="absolute bottom-2 right-2">
						<Badge
							variant="secondary"
							className="flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white/80"
						>
							<StarIcon className="h-3 w-3" />
							{(movie.stats.avgRating / 2).toFixed(1)}
						</Badge>
					</div>
				)}
			</div>
		</Link>
	);
}

// Star icon for the rating badge
function StarIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="currentColor"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
		</svg>
	);
}
