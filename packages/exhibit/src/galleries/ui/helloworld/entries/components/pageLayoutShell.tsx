import { ReactNode } from "react";

import {ErrorBoundary} from "@otuekong-portfolio/curio";

interface PageLayoutShellProps {
	children: ReactNode;
	mobileContent: ReactNode;
	sidebar: ReactNode;
}

function PageLayoutShell({
	children,
	mobileContent,
	sidebar
}: PageLayoutShellProps) {
	return (
		<div className="flex flex-col lg:flex-row h-screen">

			<aside
				aria-label="Introduction and Navigation"
				className="hidden lg:block w-3/10 bg-white dark:bg-gray-800 overflow-y-auto">
				<ErrorBoundary>
					{sidebar}
				</ErrorBoundary>
			</aside>

			<main className="flex-1 overflow-y-auto pt-17.75 lg:pt-0">
				<ErrorBoundary>
					{/* Mobile-only view */}
					<div className="block lg:hidden">
						{mobileContent}
					</div>

					{/* Desktop-only view */}
					<div className="hidden lg:block">
						{children}
					</div>
				</ErrorBoundary>
			</main>

		</div>
	);
}

export default PageLayoutShell;
