"use client";

import { ReactNode } from "react";

import { Heading, Text } from "@otuekong-portfolio/design-system";

import { PageContainer } from "../../shared";

import { Footer } from "./footer";
import { Header } from "./header";

interface HelloworldLayoutProps {
	children: ReactNode;
}

function HelloworldLayout({
	children
}: HelloworldLayoutProps) {
	return (
		<PageContainer>
			<Header />

			{children}

			{!children && (
			<main>
				<Heading>Hello World!!</Heading>
				<Text>
					Welcome to the Hello World application!
				</Text>
			</main>
			)}

			<Footer />
		</PageContainer>
	);
}

export default HelloworldLayout;
