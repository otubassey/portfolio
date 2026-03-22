export const ComponentCategory = {
	DATA_DISPLAY: "Data Display",
	FEEDBACK: "Feedback",
	INPUTS: "Inputs",
	LAYOUT: "Layout",
	NAVIGATION: "Navigation"
} as const;

export const ComponentName = {
	ALERT: "Alert",
	BACKDROP: "Backdrop",
	BUTTON: "Button",
	BUTTON_BASE: "ButtonBase",
	CARD: "Card",
	CARD_ACTIONS: "CardActions",
	CARD_CONTENT: "CardContent",
	CARD_HEADER: "CardHeader",
	CHECKBOX: "Checkbox",
	CHIP: "Chip",
	COLLAPSE: "Collapse",
	COPY_BUTTON: "CopyButton",
	DROPDOWN: "Dropdown",
	EDITOR_SHELL: "EditorShell",
	EMAIL_TEXT_FIELD: "EmailTextField",
	ERROR_BOUNDARY: "ErrorBoundary",
	FOOTER: "Footer",
	HEADING: "Heading",
	ICON: "Icon",
	ICON_BUTTON: "IconButton",
	INLINE_BUTTON: "InlineButton",
	INPUT_ICON: "InputIcon",
	LABEL: "Label",
	LINK: "Link",
	LINK_BUTTON: "LinkButton",
	LIST: "List",
	LIST_ITEM: "ListItem",
	LIST_ITEM_BUTTON: "ListItemButton",
	LIST_ITEM_ICON: "ListItemIcon",
	LIST_ITEM_TEXT: "ListItemText",
	LIST_SUB_HEADER: "ListSubHeader",
	MENU: "Menu",
	MENU_ITEM: "MenuItem",
	PLAYGROUND: "Playground",
	SEARCH_FIELD: "SearchField",
	SECTION: "Section",
	SECTION_HEADING: "SectionHeading",
	SELECT: "Select",
	STATUS_CHIP: "StatusChip",
	SURFACE: "Surface",
	SWITCH: "Switch",
	TAB: "Tab",
	TABLE: "Table",
	TABLE_BODY: "TableBody",
	TABLE_BODY_CELL: "TableBodyCell",
	TABLE_HEAD: "TableHead",
	TABLE_HEAD_CELL: "TableHeadCell",
	TABLE_ROW: "TableRow",
	TABS: "Tabs",
	TEXT: "Text",
	TEXT_AREA: "TextArea",
	TEXT_FIELD: "TextField",
	TOGGLE_ICON_BUTTON: "ToggleIconButton",
	TOOLTIP: "Tooltip",
	TYPOGRAPHY: "Typography"
} as const;

export type ComponentCategoryType = typeof ComponentCategory[keyof typeof ComponentCategory];

export type ComponentType = typeof ComponentName[keyof typeof ComponentName];

export type ComponentsByCategoryType = Record<ComponentCategoryType, Array<ComponentType>>;

export const COMPONENTS_BY_CATEGORY: ComponentsByCategoryType = {
	[ComponentCategory.DATA_DISPLAY]: [
		ComponentName.CHIP,
		ComponentName.EDITOR_SHELL,
		ComponentName.HEADING,
		ComponentName.ICON,
		ComponentName.INPUT_ICON,
		ComponentName.LABEL,
		ComponentName.LIST,
		ComponentName.LIST_ITEM,
		ComponentName.LIST_ITEM_ICON,
		ComponentName.LIST_ITEM_TEXT,
		ComponentName.LIST_SUB_HEADER,
		ComponentName.STATUS_CHIP,
		ComponentName.TABLE,
		ComponentName.TABLE_BODY,
		ComponentName.TABLE_BODY_CELL,
		ComponentName.TABLE_HEAD,
		ComponentName.TABLE_HEAD_CELL,
		ComponentName.TABLE_ROW,
		ComponentName.TEXT,
		ComponentName.TYPOGRAPHY
	],
	[ComponentCategory.FEEDBACK]: [
		ComponentName.ALERT,
		ComponentName.BACKDROP,
		ComponentName.ERROR_BOUNDARY,
		ComponentName.TOOLTIP
	],
	[ComponentCategory.INPUTS]: [
		ComponentName.BUTTON,
		ComponentName.BUTTON_BASE,
		ComponentName.CHECKBOX,
		ComponentName.COPY_BUTTON,
		ComponentName.EMAIL_TEXT_FIELD,
		ComponentName.ICON_BUTTON,
		ComponentName.INLINE_BUTTON,
		ComponentName.LINK_BUTTON,
		ComponentName.LIST_ITEM_BUTTON,
		ComponentName.SEARCH_FIELD,
		ComponentName.SELECT,
		ComponentName.SWITCH,
		ComponentName.TEXT_AREA,
		ComponentName.TEXT_FIELD,
		ComponentName.TOGGLE_ICON_BUTTON
	],
	[ComponentCategory.LAYOUT]: [
		ComponentName.CARD,
		ComponentName.CARD_ACTIONS,
		ComponentName.CARD_CONTENT,
		ComponentName.CARD_HEADER,
		ComponentName.COLLAPSE,
		ComponentName.FOOTER,
		ComponentName.SECTION,
		ComponentName.SECTION_HEADING,
		ComponentName.SURFACE
	],
	[ComponentCategory.NAVIGATION]: [
		ComponentName.DROPDOWN,
		ComponentName.LINK,
		ComponentName.MENU,
		ComponentName.MENU_ITEM,
		ComponentName.TAB,
		ComponentName.TABS
	]
} as const;
