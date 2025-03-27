"use client"

/**
 * Client component wrapper for the WatchDialog
 * This allows us to use the WatchDialog in server components
 */

import WatchDialog from "@/components/watch-dialog"
import { Movie } from "@/components/movie-poster"

export interface WatchDialogWrapperProps {
  movie: Movie
}

export default function WatchDialogWrapper({ movie }: WatchDialogWrapperProps) {
  return <WatchDialog movie={movie} />
}
