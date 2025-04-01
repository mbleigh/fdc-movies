"use client";

import { cn } from "@/lib/utils";

export default function MovieRating({
	rating,
	className,
}: { rating: string; className?: string }) {
	return (
		<div className={cn("border py-0.5 px-1 uppercase text-xs", className)}>
			{rating}
		</div>
	);
}
