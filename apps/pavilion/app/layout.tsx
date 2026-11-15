import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ReactNode } from "react";

const geistSans = Geist({
	subsets: ["latin"],
  	variable: "--font-geist-sans"
});

const geistMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-geist-mono"
});

export const metadata: Metadata = {
	description: "A portfolio showcasing modern web development",
	title: "Otuekong Bassey's Portfolio"
};

interface RootLayoutProps {
	children: ReactNode;
}

function RootLayout({
	children,
}: Readonly<RootLayoutProps>) {
	return (
		<html lang="en">
			{/* TODO: Find a way to achive this with next-themes */}
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				{children}
			</body>
		</html>
	);
}

export default RootLayout;
