import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "standalone",
	transpilePackages: [
		"@otuekong-portfolio/curio",
		"@otuekong-portfolio/exhibit"
	]
};

export default nextConfig;
