import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	transpilePackages: [
		"@otuekong-portfolio/exhibit",
		"@otuekong-portfolio/curio"
	]
};

export default nextConfig;
