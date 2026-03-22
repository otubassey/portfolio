"use client";

import { ReactNode } from "react";

import { PageContainer } from "../../shared";

interface PavilionLayoutProps {
	children: ReactNode;
}

function PavilionLayout({
	children
}: PavilionLayoutProps) {
	return (
		<PageContainer>
			{children}
		</PageContainer>
	);
}

export default PavilionLayout;
