"use client";
/**
 * Watch History Page
 * Displays a user's movie watch history grouped by month
 */

import Image from "next/image";
import Link from "next/link";
import { format, parse } from "date-fns";
import { Film, Phone, Smartphone, Trash2, Tv } from "lucide-react";
import { dc } from "@/lib/firebase";
import { deleteWatch, watchHistoryPage } from "@app/data";
import { Button } from "@/components/ui/button";
import { useWatchHistoryPage } from "@app/data/react";
import { toast } from "sonner";

function WatchFormat({ format }: { format: string }) {
	let Icon;
	switch (format) {
		case "theater":
			Icon = Film;
			break;
		case "home":
			Icon = Tv;
			break;
		case "mobile":
			Icon = Smartphone;
			break;
		default:
			Icon = Film;
			break;
	}

	return (
		<div className="flex items-center text-secondary text-sm">
			<Icon className="size-3 mr-1" />
			{format.charAt(0).toUpperCase()}
			{format.substring(1)}
		</div>
	);
}

// Helper function to group watches by month
function groupWatchesByMonth(watches: any[]) {
	const grouped: Record<string, any[]> = {};

	watches.forEach((watch) => {
		// Format the month key (e.g., "2025-03" for March 2025)
		const date = new Date(watch.watchDate);
		const monthKey = format(date, "yyyy-MM");

		// Initialize the month array if it doesn't exist
		if (!grouped[monthKey]) {
			grouped[monthKey] = [];
		}

		// Add the watch to the month group
		grouped[monthKey].push(watch);
	});

	// Sort the watches within each month by date (newest first)
	Object.keys(grouped).forEach((month) => {
		grouped[month].sort((a, b) => {
			return new Date(b.watchDate).getTime() - new Date(a.watchDate).getTime();
		});
	});

	return grouped;
}

// Helper function to render star rating
function renderStarRating(rating: number | undefined | null) {
	if (rating === undefined || rating === null) return null;

	// Convert rating to stars (out of 5)
	const starCount = Math.round(rating / 2);

	return (
		<div className="flex">
			{Array.from({ length: 5 }).map((_, i) => (
				<svg
					key={i}
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill={i < starCount ? "currentColor" : "none"}
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className={i < starCount ? "text-accent" : "text-muted"}
				>
					<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
				</svg>
			))}
		</div>
	);
}

export default function WatchHistoryPage() {
	// Fetch watch history data
	const { data, isLoading, refetch } = useWatchHistoryPage(dc);

	if (isLoading) {
		return <></>;
	}
	const { watches } = data;
	// Group watches by month
	const watchesByMonth = groupWatchesByMonth(watches);

	// Sort months in descending order (newest first)
	const sortedMonths = Object.keys(watchesByMonth).sort().reverse();

	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8">Watch History</h1>

			<div className="bg-card rounded-lg overflow-hidden shadow-md">
				<table className="w-full">
					<thead>
						<tr className="border-b border-border">
							<th className="py-3 px-4 text-left w-16">Month</th>
							<th className="py-3 px-4 text-left w-16">Day</th>
							<th className="py-3 px-4 text-left">Film</th>
							<th className="py-3 px-4 text-left w-24">Released</th>
							<th className="py-3 px-4 text-left w-32">Rating</th>
							<th className="py-3 px-4 text-center w-16">Actions</th>
						</tr>
					</thead>
					<tbody>
						{sortedMonths.map((monthKey) => {
							const monthWatches = watchesByMonth[monthKey];
							const monthDate = parse(monthKey, "yyyy-MM", new Date());
							const monthName = format(monthDate, "MMM");
							const year = format(monthDate, "yyyy");

							return monthWatches.map((watch, index) => {
								const watchDate = new Date(watch.watchDate);
								const day = format(watchDate, "dd");
								const releaseYear = new Date(
									watch.movie.releaseDate,
								).getFullYear();
								const rating = watch.review?.rating;

								// Only show month in first row of the month group
								const isFirstInMonth = index === 0;

								return (
									<tr
										key={watch.id}
										className="border-b border-border hover:bg-muted/50"
									>
										<td className="py-4 px-4">
											{isFirstInMonth && (
												<div className="font-bold text-secondary leading-5 text-center">
													<div className="uppercase text-lg">{monthName}</div>
													<div>{year}</div>
												</div>
											)}
										</td>
										<td className="py-4 px-4 text-2xl font-bold">{day}</td>
										<td className="py-4 px-4">
											<div className="flex items-center gap-3">
												<div className="relative w-12 h-16 overflow-hidden rounded">
													<Image
														src={watch.movie.posterUrl.replace(
															".jpg",
															"-300x400.jpg",
														)}
														alt={watch.movie.title}
														fill
														className="object-cover"
														sizes="48px"
													/>
												</div>
												<div>
													<Link
														href={`/movies/${watch.movie.id}`}
														className="font-bold hover:text-accent"
													>
														{watch.movie.title}
													</Link>
													{watch.format && (
														<WatchFormat format={watch.format} />
													)}
												</div>
											</div>
										</td>
										<td className="py-4 px-4 text-center">{releaseYear}</td>
										<td className="py-4 px-4">{renderStarRating(rating)}</td>
										<td className="py-4 px-4 text-center">
											<Button
												variant="ghost"
												size="icon"
												className="h-8 w-8"
												onClick={async () => {
													await deleteWatch({ watchId: watch.id });
													refetch();
													toast(`Deleted watch for '${watch.movie.title}'`);
												}}
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</td>
									</tr>
								);
							});
						})}
					</tbody>
				</table>
			</div>

			{sortedMonths.length === 0 && (
				<div className="text-center py-12 text-muted-foreground">
					<p>
						No watch history found. Start watching movies to see your history
						here!
					</p>
				</div>
			)}
		</div>
	);
}
