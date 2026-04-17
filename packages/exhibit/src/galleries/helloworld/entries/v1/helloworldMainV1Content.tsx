import { Backdrop } from "@otuekong-portfolio/curio";

import { useAppDetails } from "../../providers";

import { PortfolioView } from "../components";

function HelloworldMainV1Content() {
	const { isMobileMenuOpen, toggleIsMobileMenuOpen } = useAppDetails();

	return (
		<>
			<PortfolioView />

			{isMobileMenuOpen && (
			<Backdrop
				onClick={() => toggleIsMobileMenuOpen(false)}
				open
			/>
			)}
		</>
	);
}

export default HelloworldMainV1Content;
