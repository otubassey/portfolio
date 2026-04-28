"use client";

import { Chip, ChipProps, IconName, ICONS_NAME, List, ListItem } from "@otuekong-portfolio/curio";

import { Technology, TechnologyName } from "../data";

const TECHNOLOGY_NAME_TO_ICON_MAP: Record<string, IconName> = {
	[Technology.ELECTRON_JS.toLocaleLowerCase()]: ICONS_NAME.ELECTRON,
	[Technology.EXPRESS_JS.toLocaleLowerCase()]: ICONS_NAME.EXPRESS,
	[Technology.HTML.toLocaleLowerCase()]: ICONS_NAME.HTML,
	[Technology.JDBC.toLocaleLowerCase()]: ICONS_NAME.JAVA,
	[Technology.JSF.toLocaleLowerCase()]: ICONS_NAME.JAVA,
	[Technology.JSP.toLocaleLowerCase()]: ICONS_NAME.JAVA,
	[Technology.JPA.toLocaleLowerCase()]: ICONS_NAME.JAVA,
	[Technology.JUNIT.toLocaleLowerCase()]: ICONS_NAME.JUNIT,
	[Technology.NEXT_JS.toLocaleLowerCase()]: ICONS_NAME.NEXT_DOT_JS,
	[Technology.NODE_JS.toLocaleLowerCase()]: ICONS_NAME.NODE,
	[Technology.OPENAPI_SWAGGER.toLocaleLowerCase()]: ICONS_NAME.OPENAPI,
	[Technology.REACT_NATIVE.toLocaleLowerCase()]: ICONS_NAME.REACT,
	[Technology.REST.toLocaleLowerCase()]: ICONS_NAME.NETWORK_WIRED,
	[Technology.SOAP.toLocaleLowerCase()]: ICONS_NAME.NETWORK_WIRED,
	[Technology.SPRING_BOOT.toLocaleLowerCase()]: ICONS_NAME.SPRING_BOOT,
	[Technology.SPRING_FRAMEWORK.toLocaleLowerCase()]: ICONS_NAME.SPRING_FRAMEWORK,
};

const getIconForTech = (name: TechnologyName): IconName | undefined => {
	const lowerCaseName = name.toLocaleLowerCase();
	const iconName = TECHNOLOGY_NAME_TO_ICON_MAP[lowerCaseName] || (lowerCaseName as IconName);

	return Object.values(ICONS_NAME).includes(iconName) ? iconName : undefined;
};

const getFilteredTechnologies = (
	exclude?: Array<TechnologyName>,
	only?: Array<TechnologyName>
): Array<TechnologyName> => {
	let sourceList: Array<TechnologyName> = Object.values(Technology);

	if(Array.isArray(only) && only.length > 0) {
		sourceList = only;
	}

	if(Array.isArray(exclude) && exclude.length > 0) {
		sourceList = sourceList
			.filter(technology => !exclude.includes(technology));
	}

	return sourceList;
}

interface TechnologyChipsProps {
	chipProps?: Partial<ChipProps>;
	exclude?: Array<TechnologyName>;
	only?: Array<TechnologyName>;
}

const TechnologyChips = ({
	chipProps,
	exclude = [],
	only = []
}: TechnologyChipsProps) => {
	const filteredTechnologies = getFilteredTechnologies(exclude, only);

	return (
		<List aria-label="Technologies used" className="flex flex-wrap gap-2">
			{filteredTechnologies.map(technology => {
				const iconName = getIconForTech(technology);
				return (
					<ListItem
						key={technology}
						className="inline-flex w-fit">
						<Chip
							color="primary"
							label={technology}
							size="medium"
							{...chipProps}
							icon={iconName}
						/>
					</ListItem>
				);
			})}
		</List>
	);
};

TechnologyChips.displayName = "TechnologyChips";

export default TechnologyChips;
