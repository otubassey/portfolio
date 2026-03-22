import { Backdrop } from "@otuekong-portfolio/design-system";

import { MainPage } from "../../constants";
import { LookbookView, PortfolioView } from "../../features";
import { useAppDetails } from "../../providers";

function HelloworldV2Content() {
	const {
		isMobileMenuOpen,
		onPageSectionSelect,
		selectedPage,
		selectedPageSection,
		toggleIsMobileMenuOpen
	} = useAppDetails();

	return (
		<>
			{selectedPage === MainPage.PORTFOLIO && (
			<PortfolioView />
			)}

			{selectedPage === MainPage.LOOKBOOK && (
			<LookbookView
				onPageSectionSelect={onPageSectionSelect}
				selectedPageSection={selectedPageSection}
			/>
			)}

			{isMobileMenuOpen && (
			<Backdrop
				onClick={() => toggleIsMobileMenuOpen(false)}
				open
			/>
			)}
		</>
	);
}

export default HelloworldV2Content;
