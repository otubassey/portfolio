import {
	COMPONENTS_BY_CATEGORY as BASE_COMPONENTS_BY_CATEGORY,
	COMPONENT_REGISTRY as BASE_COMPONENT_REGISTRY,
	ComponentsByCategoryType,
	ComponentName
} from "@otuekong-portfolio/design-system";

const HelloworldComponentName = {
	CONSOLE_FRAME: "ConsoleFrame",
	HERO_HELLOWORLD: "HelloWorldInteractiveHero",
	HERO_MATRIX: "MatrixInteractiveHero",
	HERO_PROFILE_CODE_EDITOR: "ProfileCodeEditorInteractiveHero",
	HERO_SIMPLE_VARIANT: "SimpleVariant",
	HERO_TERMINAL: "ProfileTerminalInteractiveHero",
	PROFESSIONAL_LINKS: "ProfessionalLinks",
	TECHNOLOGY_CHIPS: "TechnologyChips"
} as const;

export const HELLOWORLD_COMPONENT_KEYS = [
	ComponentName.ALERT,
	ComponentName.BACKDROP,
	ComponentName.BUTTON,
	ComponentName.BUTTON_BASE,
	ComponentName.CARD,
	ComponentName.CARD_ACTIONS,
	ComponentName.CARD_CONTENT,
	ComponentName.CARD_HEADER,
	ComponentName.CHIP,
	ComponentName.COLLAPSE,
	HelloworldComponentName.CONSOLE_FRAME,
	ComponentName.COPY_BUTTON,
	ComponentName.DROPDOWN,
	ComponentName.EDITOR_SHELL,
	ComponentName.EMAIL_TEXT_FIELD,
	ComponentName.ERROR_BOUNDARY,
	ComponentName.FOOTER,
	ComponentName.HEADING,
	ComponentName.ICON,
	ComponentName.ICON_BUTTON,
	ComponentName.INLINE_BUTTON,
	ComponentName.INPUT_ICON,
	ComponentName.LABEL,
	ComponentName.LINK,
	ComponentName.LINK_BUTTON,
	ComponentName.LIST,
	ComponentName.LIST_ITEM,
	ComponentName.LIST_ITEM_BUTTON,
	ComponentName.LIST_ITEM_TEXT,
	ComponentName.MENU,
	ComponentName.MENU_ITEM,
	HelloworldComponentName.PROFESSIONAL_LINKS,
	ComponentName.SECTION,
	ComponentName.SELECT,
	ComponentName.STATUS_CHIP,
	ComponentName.SURFACE,
	ComponentName.TAB,
	ComponentName.TABLE,
	ComponentName.TABLE_BODY,
	ComponentName.TABLE_BODY_CELL,
	ComponentName.TABLE_HEAD,
	ComponentName.TABLE_HEAD_CELL,
	ComponentName.TABLE_ROW,
	ComponentName.TABS,
	HelloworldComponentName.TECHNOLOGY_CHIPS,
	ComponentName.TEXT,
	ComponentName.TEXT_AREA,
	ComponentName.TEXT_FIELD,
	ComponentName.TYPOGRAPHY,
] as const;

export const HELLOWORLD_COMPONENTS_BY_CATEGORY: ComponentsByCategoryType = Object.fromEntries(
    Object.entries(BASE_COMPONENTS_BY_CATEGORY).map(([category, components]) => [
        category,
        components.filter((component) =>
            (HELLOWORLD_COMPONENT_KEYS as readonly string[]).includes(component)
        ),
    ]).filter(([_, components]) => (components as string[]).length > 0)
) as ComponentsByCategoryType;

export const COMPONENT_REGISTRY = Object.fromEntries(
    Object.entries(BASE_COMPONENT_REGISTRY).filter(([key]) =>
        (HELLOWORLD_COMPONENT_KEYS as readonly string[]).includes(key)
    )
) as Pick<typeof BASE_COMPONENT_REGISTRY, typeof HELLOWORLD_COMPONENT_KEYS[number]>;

export default COMPONENT_REGISTRY;
