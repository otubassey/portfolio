import "./globals.css";

import { ReactNode } from "react";
import type { Metadata } from "next";

import { HELLOWORLD_V1_APP_DETAILS, HelloworldProvider } from "@otuekong-portfolio/exhibit";
import { THEME_BLOCKING_SCRIPT } from "@otuekong-portfolio/curio";

export const metadata: Metadata = {
	title: "Otuekong Bassey - Portfolio v1",
	description: "A portfolio showcasing modern web development",
} as const;

interface RootLayoutProps {
	children: ReactNode;
}

function RootLayout({
	children
}: RootLayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: THEME_BLOCKING_SCRIPT }} />
			</head>

			<body className="h-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
				<HelloworldProvider appDetails={HELLOWORLD_V1_APP_DETAILS}>
					{children}
				</HelloworldProvider>
			</body>
		</html>
	);
}

export default RootLayout;
