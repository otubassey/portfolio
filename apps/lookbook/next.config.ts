import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	transpilePackages: [
		"@otuekong-portfolio/common",
		"@otuekong-portfolio/design-system",
		"@otuekong-portfolio/layouts"
	]
};

export default nextConfig;
