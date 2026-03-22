import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	transpilePackages: [
		"@otuekong-portfolio/core",
		"@otuekong-portfolio/design-system",
		"@otuekong-portfolio/layouts",
		"helloworld-v1",
		"helloworld-v2"
	]
};

export default nextConfig;
