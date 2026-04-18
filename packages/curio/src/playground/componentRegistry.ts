const ComponentCategory = {
	DATA_DISPLAY: "Data Display",
	FEEDBACK: "Feedback",
	INPUTS: "Inputs",
	LAYOUT: "Layout",
	NAVIGATION: "Navigation"
} as const;

const ComponentName = {
	ALERT: "Alert",
	BACKDROP: "Backdrop",
	BUTTON: "Button",
	BUTTON_BASE: "ButtonBase",
	BUTTON_ICON: "ButtonIcon",
	CARD: "Card",
	CARD_ACTIONS: "CardActions",
	CARD_CONTENT: "CardContent",
	CARD_HEADER: "CardHeader",
	CARD_MEDIA: "CardMedia",
	CHECKBOX: "Checkbox",
	CHIP: "Chip",
	COLLAPSE: "Collapse",
	COPY_BUTTON: "CopyButton",
	DROPDOWN: "Dropdown",
	ERROR_BOUNDARY: "ErrorBoundary",
	HEADING: "Heading",
	ICON: "Icon",
	ICON_BUTTON: "IconButton",
	LABEL: "Label",
	LINK: "Link",
	LIST: "List",
	LIST_ITEM: "ListItem",
	LIST_ITEM_BUTTON: "ListItemButton",
	LIST_ITEM_ICON: "ListItemIcon",
	LIST_ITEM_TEXT: "ListItemText",
	LIST_SUB_HEADER: "ListSubHeader",
	MENU: "Menu",
	MENU_ITEM: "MenuItem",
	PAPER: "Paper",
	SEARCH_FIELD: "SearchField",
	SECTION: "Section",
	SELECT: "Select",
	SWITCH: "Switch",
	TABLE: "Table",
	TABLE_BODY: "TableBody",
	TABLE_BODY_CELL: "TableBodyCell",
	TABLE_HEAD: "TableHead",
	TABLE_HEAD_CELL: "TableHeadCell",
	TABLE_ROW: "TableRow",
	TEXT: "Text",
	TEXT_FIELD: "TextField",
	TOGGLE_ICON_BUTTON: "ToggleIconButton",
	TYPOGRAPHY: "Typography"
} as const;

const COMPONENTS_BY_CATEGORY: Record<string, Array<string>> = {
	[ComponentCategory.DATA_DISPLAY]: [
		ComponentName.CHIP,
		ComponentName.HEADING,
		ComponentName.ICON,
		ComponentName.LIST,
		ComponentName.LIST_ITEM,
		ComponentName.LIST_ITEM_ICON,
		ComponentName.LIST_ITEM_TEXT,
		ComponentName.LIST_SUB_HEADER,
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
		ComponentName.ERROR_BOUNDARY
	],
	[ComponentCategory.INPUTS]: [
		ComponentName.BUTTON,
		ComponentName.BUTTON_BASE,
		ComponentName.BUTTON_ICON,
		ComponentName.CHECKBOX,
		ComponentName.COPY_BUTTON,
		ComponentName.ICON_BUTTON,
		ComponentName.LABEL,
		ComponentName.SEARCH_FIELD,
		ComponentName.SELECT,
		ComponentName.SWITCH,
		ComponentName.TEXT_FIELD,
		ComponentName.TOGGLE_ICON_BUTTON
	],
	[ComponentCategory.LAYOUT]: [
		ComponentName.CARD,
		ComponentName.CARD_ACTIONS,
		ComponentName.CARD_CONTENT,
		ComponentName.CARD_HEADER,
		ComponentName.CARD_MEDIA,
		ComponentName.COLLAPSE,
		ComponentName.PAPER,
		ComponentName.SECTION
	],
	[ComponentCategory.NAVIGATION]: [
		ComponentName.DROPDOWN,
		ComponentName.LINK,
		ComponentName.LIST_ITEM_BUTTON,
		ComponentName.MENU,
		ComponentName.MENU_ITEM
	]
} as const;

const ComponentRegistry = {
	ComponentCategory,
	COMPONENTS_BY_CATEGORY,
	getComponentByName: (name: string) => (
		null
	)
};

export default ComponentRegistry;
