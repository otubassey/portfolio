import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "standalone",
	transpilePackages: [
		"@otuekong-portfolio/curio",
		"@otuekong-portfolio/exhibit",
		"@otuekong-portfolio/features",
		"helloworld-v1",
		"helloworld-v2"
	]
};

export default nextConfig;
