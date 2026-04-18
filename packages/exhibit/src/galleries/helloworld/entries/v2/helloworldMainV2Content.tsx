import { Backdrop } from "@otuekong-portfolio/curio";

import { LookbookPageSectionName, MainPage } from "../../constants";
import { useAppDetails } from "../../providers";

import { PortfolioView } from "../components";

import LookbookView from "./lookbookView";

function HelloworldMainV2Content() {
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

export default HelloworldMainV2Content;
