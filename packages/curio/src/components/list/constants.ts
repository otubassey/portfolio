export const ListStylePosition = {
    INSIDE: "inside",
    OUTSIDE: "outside"
} as const;

export const CustomListStyleType = {
    STRETCH: "stretch"
} as const;

export const ListStyleType = {
	CIRCLE: "circle",
	DECIMAL: "decimal",
	DISC: "disc",
	INHERIT: "inherit",
    NONE: "none",
	SQUARE: "square",
	...CustomListStyleType
} as const;

export const INITIAL_LIST_STYLE_VALUE = {
    listStylePosition: ListStylePosition.OUTSIDE,
    listStyleType: ListStyleType.NONE
} as const;
