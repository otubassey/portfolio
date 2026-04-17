"use client";

import { ReactNode } from "react";

import { Heading, Text } from "@otuekong-portfolio/curio";

import { PageContainer } from "../../../../common";

import { Footer } from "../../features/footer";
import { Header } from "../../features/header";

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
