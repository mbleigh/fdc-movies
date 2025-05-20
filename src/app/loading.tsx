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

import MoviePosterPlaceholder from "@/components/movie-poster-placeholder";
import ReviewPlaceholder from "@/components/review-placeholder";

export default function HomeLoading() {
	return (
		<div className="max-w-3xl mx-auto">
			<h2 className="text-2xl font-bold my-4">New Releases</h2>
			<div className="grid grid-cols-4 gap-3">
				{new Array(4).fill(null).map((_, i) => (
					<MoviePosterPlaceholder key={i} />
				))}
			</div>
			<h2 className="text-2xl font-bold my-4">Top Rated Movies</h2>
			<div className="grid grid-cols-5 gap-2">
				{new Array(5).fill(null).map((_, i) => (
					<MoviePosterPlaceholder size="small" key={i} />
				))}
			</div>
			<h2 className="text-2xl font-bold my-4">Recent Reviews</h2>
			<div className="space-y-4">
				{new Array(3).fill(null).map((_, i) => (
					<ReviewPlaceholder key={i} />
				))}
			</div>
		</div>
	);
}
