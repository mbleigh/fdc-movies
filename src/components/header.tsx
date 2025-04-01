"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/use-auth";
import { signIn, signOut } from "@/lib/firebase";
import { User } from "firebase/auth";
import { Film, History, Sparkle } from "lucide-react";

// Icons
function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
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
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.3-4.3" />
		</svg>
	);
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
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
			<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
			<circle cx="12" cy="7" r="4" />
		</svg>
	);
}

function LogOutIcon(props: React.SVGProps<SVGSVGElement>) {
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
			<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
			<polyline points="16 17 21 12 16 7" />
			<line x1="21" y1="12" x2="9" y2="12" />
		</svg>
	);
}

export interface HeaderProps {
	className?: string;
}

function UserPopover({ user }: { user: User }) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="ghost" className="relative size-8 rounded-full">
					<Avatar>
						{user.photoURL ? (
							<AvatarImage src={user.photoURL} alt="User" />
						) : (
							<AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
						)}
					</Avatar>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-56" align="end">
				<div className="grid gap-4">
					<div className="flex items-center gap-4">
						<Avatar>
							{user.photoURL ? (
								<AvatarImage src={user.photoURL} alt="User" />
							) : (
								<AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
							)}
						</Avatar>
						<div className="grid gap-1">
							<p className="text-sm font-medium">{user.displayName}</p>
						</div>
					</div>
					<div className="grid gap-2">
						<Button variant="ghost" size="sm" className="justify-start" asChild>
							<Link href="/profile">
								<UserIcon className="mr-2 size-4" />
								View Profile
							</Link>
						</Button>
						<Button
							variant="destructive"
							size="sm"
							className="justify-start"
							onClick={() => {
								signOut();
							}}
						>
							<LogOutIcon className="mr-2 size-4" />
							Sign Out
						</Button>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}

export default function Header({ className }: HeaderProps) {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState("");
	const { user } = useAuth();

	// Handle search form submission
	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
		}
	};
	return (
		<header
			className={cn("border-b bg-background flex justify-center", className)}
		>
			<div className="container flex h-16 items-center justify-between px-4">
				<div className="flex items-center gap-4">
					{/* App name */}
					<Link href="/" className="text-xl font-bold mr-2">
						FriendlyMovies
					</Link>

					{/* Navigation links */}
					<nav className="hidden md:flex items-center space-x-2">
						<Button asChild variant="ghost">
							<Link href="/browse">
								<Film /> Browse
							</Link>
						</Button>
						<Button asChild variant="ghost">
							<Link href="/watches">
								<History />
								My Watches
							</Link>
						</Button>
						<Button asChild variant="ghost">
							<Link href="/recommender">
								<Sparkle /> NextWatch
							</Link>
						</Button>
					</nav>
				</div>

				<div className="flex items-center gap-3">
					{/* Search bar */}
					<form
						onSubmit={handleSearch}
						className="relative flex-1 max-w-md mx-4 hidden sm:flex"
					>
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<SearchIcon className="size-4 text-muted-foreground" />
						</div>
						<Input
							type="search"
							placeholder="Search movies..."
							className="pl-10"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</form>
					{/* Theme toggle button */}
					<ThemeToggle />

					{user ? (
						<UserPopover user={user} />
					) : (
						<Button variant="outline" onClick={() => signIn()}>
							Sign In
						</Button>
					)}
				</div>
			</div>
		</header>
	);
}
