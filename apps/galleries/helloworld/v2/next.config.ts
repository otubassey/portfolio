import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	transpilePackages: [
		"@otuekong-portfolio/curio",
		"@otuekong-portfolio/exhibit",
		"@otuekong-portfolio/features"
	]
};

export default nextConfig;
