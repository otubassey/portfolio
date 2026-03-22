import { Backdrop } from "@otuekong-portfolio/design-system";

import { LookbookPageSectionName, MainPage } from "../../constants";
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
				onComponentChange={onPageSectionSelect}
				selectedPageSection={(selectedPageSection as LookbookPageSectionName) || null}
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
