import { Backdrop } from "@otuekong-portfolio/design-system";

import { PortfolioView } from "../../features";
import { useAppDetails } from "../../providers";

function HelloworldV1Content() {
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

export default HelloworldV1Content;
