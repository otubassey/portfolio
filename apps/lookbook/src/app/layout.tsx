import "./globals.css";

import { ReactNode } from "react";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { THEME_BLOCKING_SCRIPT } from "@otuekong-portfolio/curio";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Lookbook App",
	description: "A workbench of sorts.",
};

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

			<body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100`}>
				{children}
			</body>

		</html>
	);
}

export default RootLayout;
