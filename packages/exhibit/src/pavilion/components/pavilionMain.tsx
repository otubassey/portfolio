"use client";

import { ReactNode } from "react";

import { PageContainer } from "../../common";

interface PavilionMainProps {
	children: ReactNode;
}

function PavilionMain({
	children
}: PavilionMainProps) {
	return (
		<PageContainer>
			{children}
		</PageContainer>
	);
}

export default PavilionMain;
