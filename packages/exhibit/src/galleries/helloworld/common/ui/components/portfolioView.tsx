"use client";

import {
	HelloworldPortfolioViewItems,
	HelloworldPortfolioViewSection,
	HelloworldPortfolioViewSidebar,
} from "@otuekong-portfolio/features/helloworld-client";
import {
	Breadcrumb,
	OnNavigateHandler
} from "@otuekong-portfolio/features/navigation";

import PageLayoutShell from "./pageLayoutShell";

export interface PortfolioViewProps {
	breadcrumbs: ReadonlyArray<Breadcrumb>;
	clientId: string;
	lastActiveBreadcrumb: Breadcrumb | undefined;
	onNavigate: OnNavigateHandler;
	targetAppId: string;
}

const PortfolioView = ({
	breadcrumbs,
	clientId,
	lastActiveBreadcrumb,
	onNavigate,
	targetAppId
}: PortfolioViewProps) => {
	return (
		<PageLayoutShell
			mobileContent={
				<HelloworldPortfolioViewSection
					clientId={clientId}
					lastActiveBreadcrumb={lastActiveBreadcrumb}
					targetAppId={targetAppId}
				/>
			}
			sidebar={
				<HelloworldPortfolioViewSidebar
					breadcrumbs={breadcrumbs}
					onNavigate={onNavigate}
				/>
			}>

			<HelloworldPortfolioViewItems
				clientId={clientId}
				lastActiveBreadcrumb={lastActiveBreadcrumb}
				targetAppId={targetAppId}
			/>

		</PageLayoutShell>
	);
};

export default PortfolioView;
