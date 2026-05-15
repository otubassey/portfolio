"use client";

import { ReactNode } from "react";

import { CssUtils } from "@otuekong-portfolio/curio";

interface PageContainerProps {
	children: ReactNode;
	className?: string;
}

function PageContainer({
	children,
	className = ""
}: PageContainerProps) {
	return (
		<div className={CssUtils.mergeClasses(
			"min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200",
			className
		)}>
			{children}
		</div>
	);
}

export default PageContainer;
