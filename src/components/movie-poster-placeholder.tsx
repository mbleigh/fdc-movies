"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Movie poster placeholder component that matches the shape of movie-poster.tsx
// but renders as a translucent placeholder instead of an actual image
// Used for loading states and fallbacks

export interface MoviePosterPlaceholderProps {
	variant?: "default" | "minimal";
	size?: "small" | "medium" | "full";
	className?: string;
}

export default function MoviePosterPlaceholder({
	variant = "default",
	size = "medium",
	className,
}: MoviePosterPlaceholderProps) {
	return (
		<div className={className}>
			<div className="relative aspect-[3/4] w-full">
				<div
					className={cn(
						"h-full w-full bg-muted/50 animate-pulse",
						size === "small" ? "rounded" : "rounded-lg",
						"border border-border",
					)}
				/>

				{variant === "default" && (
					<div className="absolute bottom-2 right-2">
						<Badge
							variant="secondary"
							className="flex items-center gap-1 bg-black/30 backdrop-blur-sm text-transparent"
						>
							<StarIcon className="h-3 w-3 text-muted/50" />
							<span className="w-6 h-3 bg-muted/50 rounded-sm" />
						</Badge>
					</div>
				)}
			</div>
		</div>
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
