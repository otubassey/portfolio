import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	transpilePackages: [
		"@otuekong-portfolio/core",
		"@otuekong-portfolio/design-system",
		"@otuekong-portfolio/layouts"
	]
};

export default nextConfig;
