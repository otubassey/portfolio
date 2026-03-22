import { ComponentName } from "@otuekong-portfolio/design-system";

import { AppDetail } from "../constants";

export const APP_DETAILS: Array<AppDetail> = [
	{
		family: "Helloworld",
		name: "Helloworld-v2",
		component: null,
		pageDetails: [
			{
				name: "Portfolio",
				icon: "building",
				sections: [
					{
						name: "Home",
						icon: "home"
					},
					{
						name: "Experience",
						icon: "briefcase"
					},
					{
						name: "Projects",
						icon: "code"
					},
					{
						name: "Skills",
						icon: "award"
					},
					{
						name: "Contact",
						icon: "mail"
					}
				]
			},
			{
				name: "Lookbook",
				icon: "palette",
				sections: [ // TODO: Update icons for these sections; figure out how to simplify this and make it more dynamic
					{
						name: ComponentName.ALERT,
						icon: "book"
					},
					{
						name: ComponentName.BACKDROP,
						icon: "book"
					},
					{
						name: ComponentName.BUTTON,
						icon: "book"
					},
					{
						name: ComponentName.BUTTON_BASE,
						icon: "book"
					},
					{
						name: ComponentName.CARD,
						icon: "book"
					},
					{
						name: ComponentName.CARD_ACTIONS,
						icon: "book"
					},
					{
						name: ComponentName.CARD_CONTENT,
						icon: "book"
					},
					{
						name: ComponentName.CARD_HEADER,
						icon: "book"
					},
					{
						name: ComponentName.CHIP,
						icon: "book"
					},
					{
						name: ComponentName.COLLAPSE,
						icon: "book"
					},
					{
						name: ComponentName.COPY_BUTTON,
						icon: "book"
					},
					{
						name: ComponentName.DROPDOWN,
						icon: "book"
					},
					{
						name: ComponentName.EDITOR_SHELL,
						icon: "book"
					},
					{
						name: ComponentName.EMAIL_TEXT_FIELD,
						icon: "book"
					},
					{
						name: ComponentName.ERROR_BOUNDARY,
						icon: "book"
					},
					{
						name: ComponentName.FOOTER,
						icon: "book"
					},
					{
						name: ComponentName.HEADING,
						icon: "book"
					},
					{
						name: ComponentName.ICON,
						icon: "book"
					},
					{
						name: ComponentName.ICON_BUTTON,
						icon: "book"
					},
					{
						name: ComponentName.INLINE_BUTTON,
						icon: "book"
					},
					{
						name: ComponentName.INPUT_ICON,
						icon: "book"
					},
					{
						name: ComponentName.LABEL,
						icon: "book"
					},
					{
						name: ComponentName.LINK,
						icon: "book"
					},
					{
						name: ComponentName.LINK_BUTTON,
						icon: "book"
					},
					{
						name: ComponentName.LIST,
						icon: "book"
					},
					{
						name: ComponentName.LIST_ITEM,
						icon: "book"
					},
					{
						name: ComponentName.LIST_ITEM_BUTTON,
						icon: "book"
					},
					{
						name: ComponentName.LIST_ITEM_TEXT,
						icon: "book"
					},
					{
						name: ComponentName.MENU,
						icon: "book"
					},
					{
						name: ComponentName.MENU_ITEM,
						icon: "book"
					},
					{
						name: ComponentName.SECTION,
						icon: "book"
					},
					{
						name: ComponentName.SELECT,
						icon: "book"
					},
					{
						name: ComponentName.STATUS_CHIP,
						icon: "book"
					},
					{
						name: ComponentName.SURFACE,
						icon: "book"
					},
					{
						name: ComponentName.TAB,
						icon: "book"
					},
					{
						name: ComponentName.TABLE,
						icon: "book"
					},
					{
						name: ComponentName.TABS,
						icon: "book"
					},
					{
						name: ComponentName.TABLE_BODY,
						icon: "book"
					},
					{
						name: ComponentName.TABLE_BODY_CELL,
						icon: "book"
					},
					{
						name: ComponentName.TABLE_HEAD,
						icon: "book"
					},
					{
						name: ComponentName.TABLE_HEAD_CELL,
						icon: "book"
					},
					{
						name: ComponentName.TABLE_ROW,
						icon: "book"
					},
					{
						name: ComponentName.TEXT,
						icon: "book"
					},
					{
						name: ComponentName.TEXT_AREA,
						icon: "book"
					},
					{
						name: ComponentName.TEXT_FIELD,
						icon: "book"
					},
					{
						name: ComponentName.TYPOGRAPHY,
						icon: "book"
					},
				]
			}
		],
		version: "v2"
	}
] as const;
