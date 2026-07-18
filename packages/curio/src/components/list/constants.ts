export const ListStylePosition = Object.freeze({
    INSIDE: "inside",
    OUTSIDE: "outside"
} as const);

export const CustomListStyleType = Object.freeze({
    STRETCH: "stretch"
} as const);

export const ListStyleType = Object.freeze({
	CIRCLE: "circle",
	DECIMAL: "decimal",
	DISC: "disc",
	INHERIT: "inherit",
    NONE: "none",
	SQUARE: "square",
	...CustomListStyleType
} as const);

export const INITIAL_LIST_STYLE_VALUE = Object.freeze({
    listStylePosition: ListStylePosition.OUTSIDE,
    listStyleType: ListStyleType.NONE
} as const);
