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
/**
 * Browse Movies Page
 * Displays a grid of movies with filtering options in a sidebar
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { dc } from "@/lib/firebase";
import { useBrowseMovies } from "@app/data/react";
import { BrowseMoviesData } from "@app/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import MoviePoster from "@/components/movie-poster";
import MoviePosterPlaceholder from "@/components/movie-poster-placeholder";
import { Star } from "lucide-react";

// Available genres for filtering
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

// Filter interface
interface Filters {
	title?: string;
	minYear?: string;
	maxYear?: string;
	minRating?: number;
	genres?: string[];
}

export default function BrowsePage() {
	const router = useRouter();
	const searchParams = useSearchParams();

	// Single state object for all filters
	const [filters, setFilters] = useState<Filters>({});
	const [isInitialized, setIsInitialized] = useState(false);

	// Initialize filters from URL query parameters
	useEffect(() => {
		const newFilters: Filters = {};

		const titleParam = searchParams.get("title");
		const minYearParam = searchParams.get("minYear");
		const maxYearParam = searchParams.get("maxYear");
		const minRatingParam = searchParams.get("minRating");
		const genresParam = searchParams.get("genres");

		if (titleParam) newFilters.title = titleParam;
		if (minYearParam) newFilters.minYear = minYearParam;
		if (maxYearParam) newFilters.maxYear = maxYearParam;
		if (minRatingParam) newFilters.minRating = Number(minRatingParam);
		if (genresParam) newFilters.genres = genresParam.split(",");

		setFilters(newFilters);
		setIsInitialized(true);
	}, [searchParams]);

	// Update a single filter
	const updateFilter = (key: keyof Filters, value: any) => {
		setFilters((prev) => {
			const newFilters = { ...prev };

			// If value is empty/null/undefined, delete the key
			if (
				value === "" ||
				value === null ||
				value === undefined ||
				(Array.isArray(value) && value.length === 0)
			) {
				delete newFilters[key];
			} else {
				newFilters[key] = value;
			}

			return newFilters;
		});
	};

	// Convert filter values to query variables
	const queryVariables: Record<string, any> = {};

	// Only add non-null values to the query variables
	if (filters.title) queryVariables.partialTitle = filters.title;
	if (filters.minYear) queryVariables.minDate = `${filters.minYear}-01-01`;
	if (filters.maxYear) queryVariables.maxDate = `${filters.maxYear}-12-31`;
	if (filters.minRating !== undefined)
		queryVariables.minRating = filters.minRating * 2; // Convert 5-star scale to 10-star scale
	if (filters.genres && filters.genres.length > 0)
		queryVariables.genres = filters.genres;

	// Fetch movies with filters
	const { data, isLoading } = useBrowseMovies(dc, queryVariables);

	// Update URL when filters change
	useEffect(() => {
		if (!isInitialized) return;

		const params = new URLSearchParams();

		// Add each non-empty filter to the URL params
		Object.entries(filters).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				if (key === "genres" && Array.isArray(value)) {
					params.set(key, value.join(","));
				} else {
					params.set(key, String(value));
				}
			}
		});

		const queryString = params.toString();
		const url = queryString ? `?${queryString}` : "";

		router.push(`/browse${url}`, { scroll: false });
	}, [filters, isInitialized, router]);

	// Handle genre checkbox changes
	const handleGenreChange = (genre: string, checked: boolean) => {
		const currentGenres = filters.genres || [];

		if (checked) {
			updateFilter("genres", [...currentGenres, genre]);
		} else {
			updateFilter(
				"genres",
				currentGenres.filter((g) => g !== genre),
			);
		}
	};

	// Handle star rating selection
	const handleRatingClick = (rating: number) => {
		if (filters.minRating === rating) {
			updateFilter("minRating", undefined);
		} else {
			updateFilter("minRating", rating);
		}
	};

	// Render star rating selector
	const StarRating = () => {
		return (
			<div className="flex items-center gap-1">
				{[1, 2, 3, 4, 5].map((rating) => (
					<button
						key={rating}
						type="button"
						onClick={() => handleRatingClick(rating)}
						className={`focus:outline-none ${
							filters.minRating !== undefined && rating <= filters.minRating
								? "text-yellow-500"
								: "text-gray-300"
						}`}
					>
						<Star className="h-6 w-6" />
					</button>
				))}
			</div>
		);
	};

	// Handle reset all filters
	const handleResetFilters = () => {
		setFilters({});
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8">Browse Movies</h1>

			<div className="flex flex-col md:flex-row gap-6">
				{/* Sidebar Filters */}
				<div className="w-full md:w-64 shrink-0">
					<div className="bg-card rounded-lg p-4 shadow-sm border border-border">
						<h2 className="font-semibold text-lg mb-4">Filters</h2>

						{/* Title filter */}
						<div className="mb-6">
							<Label htmlFor="title" className="mb-2 block">
								Title
							</Label>
							<Input
								id="title"
								placeholder="Search by title"
								value={filters.title || ""}
								onChange={(e) => updateFilter("title", e.target.value)}
								className="w-full"
							/>
						</div>

						{/* Year range filter */}
						<div className="mb-6">
							<Label className="mb-2 block">Release Year</Label>
							<div className="flex gap-2">
								<Input
									placeholder="Min"
									type="number"
									min="1900"
									max="2099"
									value={filters.minYear || ""}
									onChange={(e) => updateFilter("minYear", e.target.value)}
									className="w-full"
								/>
								<Input
									placeholder="Max"
									type="number"
									min="1900"
									max="2099"
									value={filters.maxYear || ""}
									onChange={(e) => updateFilter("maxYear", e.target.value)}
									className="w-full"
								/>
							</div>
						</div>

						{/* Rating filter */}
						<div className="mb-6">
							<Label className="mb-2 block">Minimum Rating</Label>
							<StarRating />
							{filters.minRating !== undefined && (
								<Button
									variant="ghost"
									size="sm"
									className="mt-1 h-7 px-2 text-xs"
									onClick={() => updateFilter("minRating", undefined)}
								>
									Clear
								</Button>
							)}
						</div>

						{/* Genres filter */}
						<div className="mb-6">
							<Label className="mb-2 block">Genres</Label>
							<div className="space-y-2 max-h-48 overflow-y-auto pr-2">
								{GENRES.map((genre) => (
									<div key={genre} className="flex items-center space-x-2">
										<Checkbox
											id={`genre-${genre}`}
											checked={(filters.genres || []).includes(genre)}
											onCheckedChange={(checked: boolean | "indeterminate") =>
												handleGenreChange(genre, checked === true)
											}
										/>
										<Label
											htmlFor={`genre-${genre}`}
											className="text-sm font-normal cursor-pointer"
										>
											{genre}
										</Label>
									</div>
								))}
							</div>
							{filters.genres && filters.genres.length > 0 && (
								<Button
									variant="ghost"
									size="sm"
									className="mt-2 h-7 px-2 text-xs"
									onClick={() => updateFilter("genres", [])}
								>
									Clear All
								</Button>
							)}
						</div>

						{/* Reset all filters */}
						<Button
							variant="outline"
							className="w-full"
							onClick={handleResetFilters}
						>
							Reset All Filters
						</Button>
					</div>
				</div>

				{/* Movie Grid */}
				<div className="flex-1">
					{isLoading ? (
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
							{Array.from({ length: 12 }).map((_, i) => (
								<div key={i} className="space-y-2">
									<MoviePosterPlaceholder />
									<div className="h-5 bg-muted rounded w-3/4"></div>
									<div className="h-4 bg-muted rounded w-1/2"></div>
								</div>
							))}
						</div>
					) : (
						<>
							{data?.movies && data.movies.length > 0 ? (
								<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
									{data.movies.map((movie: BrowseMoviesData["movies"][0]) => (
										<div key={movie.id} className="space-y-2">
											<MoviePoster movie={movie} />
											<div>
												<Link
													href={`/movies/${movie.id}`}
													className="font-bold line-clamp-1 hover:text-primary block"
												>
													{movie.title}
												</Link>
												<div className="flex justify-between items-center text-sm text-muted-foreground">
													<span>
														{new Date(movie.releaseDate).getFullYear()}
													</span>
													<span>{movie.genre}</span>
												</div>
											</div>
										</div>
									))}
								</div>
							) : (
								<div className="flex flex-col items-center justify-center py-12 text-center">
									<p className="text-muted-foreground mb-4">
										No movies found matching your filters.
									</p>
									<Button variant="outline" onClick={handleResetFilters}>
										Clear Filters
									</Button>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}
