import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { QueryClientProvider } from "@tanstack/react-query";
import Providers from "./providers";
import { Toaster } from "sonner";

const nunito = Nunito({
	variable: "--font-nunito",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Movie Recommender",
	description: "AI-powered movie recommendations",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${nunito.variable} antialiased font-sans`}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<Providers>
						<Header />
						<main>{children}</main>
						<Toaster />
					</Providers>
				</ThemeProvider>
			</body>
		</html>
	);
}
