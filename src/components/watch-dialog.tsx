"use client";

/**
 * Watch Dialog Component
 * Renders a popup dialog for logging a movie watch with date and format options
 */

import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import MoviePoster, { Movie } from "@/components/movie-poster";
import { cn } from "@/lib/utils";
import { dc } from "@/lib/firebase";
import { addWatch } from "@app/data";
import { toast } from "sonner";

// Watch format options
const watchFormatOptions = [
	{ id: "theater", label: "Theater" },
	{ id: "home", label: "Home" },
	{ id: "mobile", label: "Mobile" },
];

export interface WatchDialogProps {
	movie: Movie;
	onSubmit?: (data: {
		movieId: string;
		watchDate: Date;
		format?: string;
	}) => void;
	children?: React.ReactNode;
}

export default function WatchDialog({
	movie,
	onSubmit,
	children,
}: WatchDialogProps) {
	// State for the dialog
	const [open, setOpen] = useState(false);

	// Form state
	const [watchDate, setWatchDate] = useState<Date>(new Date());
	const [watchFormat, setWatchFormat] = useState<string | undefined>(undefined);
	const [calendarOpen, setCalendarOpen] = useState(false);

	// Handle form submission
	const handleSubmit = async () => {
		if (onSubmit) {
			onSubmit({
				movieId: movie.id,
				watchDate,
				format: watchFormat,
			});
		}
		await addWatch(dc, {
			movieId: movie.id,
			format: watchFormat,
			watchDate: watchDate.toISOString().substring(0, 10),
		});
		toast(`Added '${movie.title}' to your watch history.`);
		setOpen(false);
	};

	// Extract release year from the date
	const releaseYear = new Date(movie.releaseDate).getFullYear();

	// Format date display
	const formatDateDisplay = (date: Date) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const yesterday = new Date(today);
		yesterday.setDate(yesterday.getDate() - 1);

		const dateToCheck = new Date(date);
		dateToCheck.setHours(0, 0, 0, 0);

		if (dateToCheck.getTime() === today.getTime()) {
			return "Today";
		} else if (dateToCheck.getTime() === yesterday.getTime()) {
			return "Yesterday";
		} else {
			return format(date, "MMM dd, yyyy");
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{children || (
					<Button className="w-full" size="lg">
						Log a Watch
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="sm:max-w-2xl p-6">
				<DialogHeader>
					<DialogTitle className="text-2xl mb-4">Log a Watch</DialogTitle>
				</DialogHeader>

				<div className="flex gap-6">
					{/* Movie poster */}
					<div>
						<MoviePoster movie={movie} variant="minimal" size="medium" />
					</div>

					<div className="w-2/3 space-y-6">
						{/* Movie title and year */}
						<div className="flex items-baseline gap-2">
							<h2 className="text-2xl font-bold">{movie.title}</h2>
							<span className="text-xl text-muted-foreground">
								{releaseYear}
							</span>
						</div>

						{/* Date picker */}
						<div className="space-y-2">
							<Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className={cn(
											"w-full justify-start text-left font-normal border-2",
											!watchDate && "text-muted-foreground",
										)}
									>
										<span>{formatDateDisplay(watchDate)}</span>
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={watchDate}
										onSelect={(date) => {
											if (date) {
												setWatchDate(date);
												setCalendarOpen(false);
											}
										}}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
						</div>

						{/* Watch format */}
						<div className="space-y-2">
							<h3 className="text-lg font-medium">How did you watch?</h3>
							<div className="flex gap-2">
								{watchFormatOptions.map((option) => (
									<Button
										key={option.id}
										variant={watchFormat === option.id ? "default" : "outline"}
										className="flex-1"
										onClick={() => setWatchFormat(option.id)}
									>
										{option.label}
									</Button>
								))}
							</div>
						</div>
					</div>
				</div>

				<DialogFooter className="mt-6">
					<Button
						className="w-24"
						variant="outline"
						onClick={() => setOpen(false)}
					>
						Cancel
					</Button>
					<Button className="w-24" variant="default" onClick={handleSubmit}>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
