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

/**
 * Search page loading component
 * Mirrors the layout of the search page with placeholder elements
 */

import MoviePosterPlaceholder from "@/components/movie-poster-placeholder";

export default function SearchLoading() {
	return (
		<div className="max-w-3xl py-8 mx-auto">
			{/* Search results heading placeholder */}
			<div className="h-8 w-64 bg-muted/50 rounded animate-pulse mb-6" />

			{/* Search results list */}
			<div className="space-y-4">
				{Array.from({ length: 5 }).map((_, index) => (
					<div
						key={index}
						className="flex flex-col md:flex-row gap-6 p-4 rounded-lg border"
					>
						{/* Movie poster placeholder */}
						<div className="flex-shrink-0 w-32">
							<MoviePosterPlaceholder
								variant="minimal"
								size="small"
								className="w-32"
							/>
						</div>

						{/* Movie details placeholders */}
						<div className="flex flex-col">
							{/* Title, rating and year placeholder */}
							<div className="flex items-center space-x-2 mb-2">
								<div className="h-7 w-48 bg-muted/50 rounded animate-pulse" />
								<div className="h-5 w-10 bg-muted/50 rounded animate-pulse ml-2" />
								<div className="h-5 w-16 bg-muted/50 rounded animate-pulse" />
							</div>

							{/* Genre and rating info placeholder */}
							<div className="h-4 w-40 bg-muted/50 rounded animate-pulse mb-3" />

							{/* Description placeholder */}
							<div className="space-y-2">
								<div className="h-4 w-full bg-muted/50 rounded animate-pulse" />
								<div className="h-4 w-5/6 bg-muted/50 rounded animate-pulse" />
								<div className="h-4 w-4/5 bg-muted/50 rounded animate-pulse" />
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
