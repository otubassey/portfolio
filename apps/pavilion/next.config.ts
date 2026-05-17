import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "standalone",
	transpilePackages: [
		"@otuekong-portfolio/curio",
		"@otuekong-portfolio/exhibit",
		"helloworld-classic",
		"helloworld-composite"
	]
};

export default nextConfig;
