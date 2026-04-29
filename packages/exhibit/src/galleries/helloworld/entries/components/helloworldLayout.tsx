"use client";

import { ReactNode } from "react";

import { Heading, Text } from "@otuekong-portfolio/curio";
import { GalleryHeader, GalleryHeaderProps, Footer } from "@otuekong-portfolio/features";

import { PageContainer } from "../../../../common";

interface HelloworldLayoutProps {
	children: ReactNode;
	headerProps?: GalleryHeaderProps;
}

function HelloworldLayout({
	children,
	headerProps
}: HelloworldLayoutProps) {
	return (
		<PageContainer>
			<GalleryHeader {...headerProps} />

			{children}

			{!children && (
			<main>
				<Heading>Hello World!!</Heading>
				<Text>
					Welcome to the Helloworld themed portfolio application!
				</Text>
			</main>
			)}

			<Footer />
		</PageContainer>
	);
}

export default HelloworldLayout;
