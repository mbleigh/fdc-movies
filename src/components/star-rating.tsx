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
 * Star Rating Component
 * Interactive star rating component that allows users to select a rating from 0-10 (0-5 stars with half-star precision)
 */

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface StarRatingProps {
	rating: number;
	onRatingChange: (rating: number) => void;
	className?: string;
	size?: "sm" | "md" | "lg";
}

export default function StarRating({
	rating,
	onRatingChange,
	className,
	size = "md",
}: StarRatingProps) {
	const [hoverRating, setHoverRating] = useState<number | null>(null);

	// Size classes for the stars
	const sizeClasses = {
		sm: "h-4 w-4",
		md: "h-5 w-5",
		lg: "h-6 w-6",
	};

	// Convert rating from 0-10 scale to star value (0-5)
	const starValue = (hoverRating !== null ? hoverRating : rating) / 2;

	// Handle mouse enter on a star position
	const handleMouseEnter = (position: number) => {
		setHoverRating(position * 2); // Convert from 1-5 to 2-10
	};

	// Handle mouse leave
	const handleMouseLeave = () => {
		setHoverRating(null);
	};

	// Handle click on a star position
	const handleClick = (position: number, isHalf: boolean) => {
		// Convert from 1-5 to 0-10 scale
		// Full stars are even numbers (2, 4, 6, 8, 10)
		// Half stars are odd numbers (1, 3, 5, 7, 9)
		const newRating = isHalf ? position * 2 - 1 : position * 2;
		onRatingChange(newRating);
	};

	// Render the stars
	const renderStars = () => {
		const stars = [];

		for (let i = 1; i <= 5; i++) {
			// Determine if this star should be filled, half-filled, or empty
			if (i <= Math.floor(starValue)) {
				// Full star
				stars.push(
					<span
						key={i}
						className="cursor-pointer"
						onMouseEnter={() => handleMouseEnter(i)}
						onClick={() => handleClick(i, false)}
					>
						<FilledStarIcon className={cn(sizeClasses[size], "text-accent")} />
					</span>,
				);
			} else if (i - 0.5 <= starValue) {
				// Half star
				stars.push(
					<span
						key={i}
						className="cursor-pointer"
						onMouseEnter={() => handleMouseEnter(i)}
						onClick={() => handleClick(i, false)}
					>
						<HalfStarIcon className={cn(sizeClasses[size], "text-accent")} />
					</span>,
				);
			} else {
				// Empty star
				stars.push(
					<span
						key={i}
						className="cursor-pointer"
						onMouseEnter={() => handleMouseEnter(i)}
						onClick={() => handleClick(i, false)}
					>
						<EmptyStarIcon className={cn(sizeClasses[size], "text-muted")} />
					</span>,
				);
			}
		}

		return (
			<div
				className={cn("flex items-center gap-0.5", className)}
				onMouseLeave={handleMouseLeave}
			>
				{stars}
			</div>
		);
	};

	return renderStars();
}

// Filled star icon
function FilledStarIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="currentColor"
			stroke="none"
			{...props}
		>
			<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
		</svg>
	);
}

// Empty star icon
function EmptyStarIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
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

// Half star icon
function HalfStarIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			{...props}
		>
			<defs>
				<linearGradient id="halfStarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="50%" stopColor="currentColor" />
					<stop offset="50%" stopColor="transparent" />
				</linearGradient>
			</defs>
			<polygon
				points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
				fill="url(#halfStarGradient)"
				stroke="currentColor"
				strokeWidth="1"
			/>
		</svg>
	);
}
