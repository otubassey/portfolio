import { PortfolioSubViewName } from "../portfolio.constants";

const composeSectionId = (
	sectionName: typeof PortfolioSubViewName[keyof typeof PortfolioSubViewName],
	componentId: string,
	prefix: string
) => (
	`${prefix}-${sectionName.toLowerCase()}-${componentId}`
);

export default composeSectionId;
