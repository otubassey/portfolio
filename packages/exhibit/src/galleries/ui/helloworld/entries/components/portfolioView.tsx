"use client";

import {
	Breadcrumb,
	HelloworldPortfolioViewItems,
	HelloworldPortfolioViewSection,
	HelloworldPortfolioViewSidebar,
	OnNavigateHandler
} from "@otuekong-portfolio/features";

import PageLayoutShell from "./pageLayoutShell";

export interface PortfolioViewProps {
	breadcrumbs: ReadonlyArray<Breadcrumb>;
	lastActiveBreadcrumb: Breadcrumb | undefined;
	onNavigate: OnNavigateHandler;
}

const PortfolioView = ({
	breadcrumbs,
	lastActiveBreadcrumb,
	onNavigate
}: PortfolioViewProps) => {
	return (
		<PageLayoutShell
			mobileContent={
				<HelloworldPortfolioViewSection
					lastActiveBreadcrumb={lastActiveBreadcrumb}
				/>
			}
			sidebar={
				<HelloworldPortfolioViewSidebar
					breadcrumbs={breadcrumbs}
					onNavigate={onNavigate}
				/>
			}>

			<HelloworldPortfolioViewItems
				lastActiveBreadcrumb={lastActiveBreadcrumb}
			/>

		</PageLayoutShell>
	);
};

export default PortfolioView;
