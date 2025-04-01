"use client";

/**
 * Review placeholder component that matches the shape of review.tsx
 * but renders as a translucent placeholder instead of actual content
 * Used for loading states and fallbacks
 */

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import MoviePosterPlaceholder from "@/components/movie-poster-placeholder";

export interface ReviewPlaceholderProps {
	variant?: "default" | "minimal";
	className?: string;
}

export default function ReviewPlaceholder({
	variant = "default",
	className,
}: ReviewPlaceholderProps) {
	// Only show movie info in default variant
	const showMovieInfo = variant === "default";

	return (
		<Card
			className={cn(
				"overflow-hidden bg-card text-card-foreground p-0",
				className,
			)}
		>
			<div className="flex relative">
				{/* Movie poster placeholder (only in default variant) */}
				{showMovieInfo && (
					<div className="w-20 ml-2 mt-2">
						<MoviePosterPlaceholder variant="minimal" size="small" />
					</div>
				)}

				<div className="flex flex-col flex-1 p-3">
					{/* Movie title and year placeholder (only in default variant) */}
					{showMovieInfo && (
						<div className="flex items-baseline gap-2 mb-2">
							<div className="h-6 w-40 bg-muted/50 rounded animate-pulse" />
							<div className="h-4 w-8 bg-muted/50 rounded animate-pulse" />
						</div>
					)}

					{/* Review time placeholder */}
					<div className="absolute top-2 right-2">
						<div className="h-3 w-16 bg-muted/50 rounded animate-pulse" />
					</div>

					{/* User info and rating placeholder */}
					<div className="flex items-center gap-2 mb-2">
						<Avatar className="h-6 w-6 bg-muted/50 animate-pulse">
							<AvatarFallback className="bg-muted/50" />
						</Avatar>
						<div className="h-4 w-24 bg-muted/50 rounded animate-pulse" />
						<div className="flex items-center ml-1 gap-1">
							{[...Array(5)].map((_, i) => (
								<div
									key={i}
									className="h-4 w-4 bg-muted/50 rounded-full animate-pulse"
								/>
							))}
						</div>
					</div>

					{/* Review text placeholder */}
					<div className="space-y-2">
						<div className="h-3 w-full bg-muted/50 rounded animate-pulse" />
						<div className="h-3 w-5/6 bg-muted/50 rounded animate-pulse" />
						<div className="h-3 w-4/6 bg-muted/50 rounded animate-pulse" />
					</div>
				</div>
			</div>
		</Card>
	);
}
