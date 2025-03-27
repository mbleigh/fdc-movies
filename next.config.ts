import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "storage.googleapis.com",
				pathname: "/next25-movies.firebasestorage.app/**",
			},
		],
	},
};

export default nextConfig;
