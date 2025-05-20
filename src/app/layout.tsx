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
