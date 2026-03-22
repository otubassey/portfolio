"use client";

import { useRef } from "react";

import { ComponentCategory, ComponentName } from "../../constants";

import { MenuItem } from "../menuItem";
import { ComponentManifest } from "../types";

import Menu, { MenuProps } from "./menu";

const MenuComponent = ({ ...props }: MenuProps) => {
	const anchorRef = useRef<HTMLButtonElement>(null);

	return (
		<div>
			<button ref={anchorRef} onClick={() => {}}>
				Open Menu
			</button>
			<Menu
				{...props}
				anchorRef={anchorRef}
				onChange={() => {}}
				onClose={() => {}}
				onHighlightedIndexChange={() => {}}>
				<MenuItem value="1">Item 1</MenuItem>
				<MenuItem value="2">Item 2</MenuItem>
				<MenuItem value="3">Item 3</MenuItem>
			</Menu>
		</div>
	);
};

const MenuManifest: ComponentManifest<MenuProps> = {
	category: ComponentCategory.NAVIGATION,
	codeExamples: [
		{
			code: `const anchorRef = useRef(null);\nconst [open, setOpen] = useState(false);\n\n<button ref={anchorRef} onClick={() => setOpen(true)}>\n  Open Menu\n</button>\n<Menu\n  anchorRef={anchorRef}\n  open={open}\n  onClose={() => setOpen(false)}\n  onChange={(value) => console.log(value)}\n  highlightedIndex={0}\n  onHighlightedIndexChange={(index) => {}}\n>\n  <MenuItem value="option1">Option 1</MenuItem>\n  <MenuItem value="option2">Option 2</MenuItem>\n</Menu>`,
			title: "Basic Menu"
		},
		{
			code: `<Menu\n  anchorRef={buttonRef}\n  open={isOpen}\n  onClose={handleClose}\n  onChange={handleSelect}\n  highlightedIndex={activeIndex}\n  onHighlightedIndexChange={setActiveIndex}\n  role="listbox"\n>\n  <MenuItem value="edit">Edit</MenuItem>\n  <MenuItem value="delete">Delete</MenuItem>\n</Menu>`,
			title: "Menu with Listbox Role"
		},
		{
			code: `
const [anchor, setAnchor] = useState(null);
const [open, setOpen] = useState(false);

return (
  <>
    <Button ref={setAnchor} onClick={() => setOpen(true)}>Open Menu</Button>
    <Menu
      anchorRef={{ current: anchor }}
      open={open}
      onClose={() => setOpen(false)}
    >
      <MenuItem value="edit">Edit</MenuItem>
      <MenuItem value="delete">Delete</MenuItem>
    </Menu>
  </>
`,
			title: "Basic Menu Usage"
		}
	],
	component: MenuComponent,
	description: "A floating menu component that displays a list of options anchored to a reference element. Supports keyboard navigation, click-outside-to-close, and portal rendering.",
	name: ComponentName.MENU,
	parameters: [
		{
			control: "none",
			description: "Reference to the anchor element that the menu will be positioned relative to.",
			name: "anchorRef",
			required: true,
			type: "RefObject<HTMLElement | null>"
		},
		{
			control: "none",
			description: "The content to be rendered inside the menu, typically MenuItem components.",
			name: "children",
			required: true,
			type: "ReactNode"
		},
		{
			control: "none",
			description: "Callback function executed when a menu item is selected. Receives the value associated with the item.",
			name: "onChange",
			required: true,
			type: "function"
		},
		{
			control: "none",
			description: "Callback function triggered when the menu should close (e.g., clicking outside or pressing Escape).",
			name: "onClose",
			required: true,
			type: "function"
		},
		{
			control: "none",
			description: "Callback triggered when the keyboard or mouse moves the highlighted selection.",
			name: "onHighlightedIndexChange",
			required: true,
			type: "function"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "Determines whether the menu is currently visible and active in the DOM.",
			name: "open",
			required: true,
			type: "boolean"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for custom width, background, or animation durations.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "select",
			defaultValue: -1,
			description: "The index of the item currently receiving keyboard focus or hover highlighting.",
			name: "highlightedIndex",
			options: [
				{ label: "0", value: 0 },
				{ label: "1", value: 1 },
				{ label: "2", value: 2 },
				{ label: "3 (OutOfBounds)", value: 3 }
			],
			required: false,
			type: "number"
		},
		{
			control: "select",
			defaultValue: "menu",
			description: "The ARIA role applied to the container, determining how screen readers interpret the list items.",
			name: "role",
			options: ["menu", "listbox"],
			required: false,
			type: "'menu' | 'listbox'"
		},
		{
			control: "none",
			description: "Inline styles to apply to the menu container.",
			name: "style",
			required: false,
			type: "CSSProperties"
		}
	],
	status: "stable"
};

export default MenuManifest;
