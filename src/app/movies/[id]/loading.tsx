/**
 * Movie details loading page component
 * Mirrors the layout of the movie details page with placeholder elements
 */

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import MoviePosterPlaceholder from "@/components/movie-poster-placeholder";
import ReviewPlaceholder from "@/components/review-placeholder";

export default function MovieLoading() {
	return (
		<div className="max-w-5xl mx-auto p-4">
			<div className="flex flex-col md:flex-row gap-8">
				{/* Movie poster placeholder */}
				<div className="w-full md:w-1/3">
					<MoviePosterPlaceholder />

					{/* Watch button placeholder */}
					<div className="mt-4">
						<div className="h-10 w-full bg-muted/50 rounded-md animate-pulse" />
					</div>
				</div>

				{/* Movie details placeholders */}
				<div className="w-full md:w-2/3">
					<div className="flex items-baseline gap-3 mb-4">
						{/* Title placeholder */}
						<div className="h-10 w-64 bg-muted/50 rounded animate-pulse" />
						{/* Rating placeholder */}
						<div className="h-6 w-12 bg-muted/50 rounded animate-pulse self-center" />
						{/* Year placeholder */}
						<div className="h-8 w-16 bg-muted/50 rounded animate-pulse" />
					</div>

					{/* Description placeholder */}
					<div className="space-y-2 mb-8">
						<div className="h-4 w-full bg-muted/50 rounded animate-pulse" />
						<div className="h-4 w-5/6 bg-muted/50 rounded animate-pulse" />
						<div className="h-4 w-4/5 bg-muted/50 rounded animate-pulse" />
					</div>

					{/* Cast section */}
					<div className="h-8 w-24 bg-muted/50 rounded animate-pulse mb-4" />
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
						{Array.from({ length: 8 }).map((_, index) => (
							<div
								key={index}
								className="flex flex-col items-center text-center"
							>
								<Avatar className="w-16 h-16 mb-2 bg-muted/50 animate-pulse">
									<AvatarFallback className="bg-muted/50" />
								</Avatar>
								<div className="h-4 w-20 bg-muted/50 rounded animate-pulse mb-1" />
								<div className="h-3 w-16 bg-muted/50 rounded animate-pulse" />
							</div>
						))}
					</div>

					{/* Reviews section */}
					<div className="h-8 w-24 bg-muted/50 rounded animate-pulse mb-4" />
					<div className="space-y-4">
						{Array.from({ length: 3 }).map((_, index) => (
							<ReviewPlaceholder key={index} variant="minimal" />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
