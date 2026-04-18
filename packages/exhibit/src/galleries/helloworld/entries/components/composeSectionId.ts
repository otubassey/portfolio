import { PortfolioPageSectionName } from "../../constants";

const composeSectionId = (
	sectionName: PortfolioPageSectionName,
	componentId: string,
	prefix: string
) => (
	`${prefix}-${sectionName.toLowerCase()}-${componentId}`
);

export default composeSectionId;
