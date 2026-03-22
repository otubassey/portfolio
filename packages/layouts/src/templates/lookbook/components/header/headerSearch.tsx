"use client";

import { useState, useMemo, useRef } from "react";

import { useToggle } from "@otuekong-portfolio/common";
import {
	Menu,
	MenuItem,
	SearchField
} from "@otuekong-portfolio/design-system";

interface HeaderSearchProps {
	components: Array<string>;
	onChange: (text: string) => void;
}

const HeaderSearch = ({
	components,
	onChange
}: HeaderSearchProps) => {
	const anchorRef = useRef<HTMLInputElement>(null);

	const [query, setQuery] = useState("");
	const [isOpen, toggleIsOpen] = useToggle(false);

	const matches = useMemo(() => {
		if(!query.trim()) return [];
		return components.filter(component =>
			component.toLowerCase().includes(query.toLowerCase())
		);
	}, [query, components]);

	const handleSearch = (value: string) => {
		setQuery(value);
		toggleIsOpen(value.length > 0);
	};

	const handleItemClick = (componentName: string) => {
		setQuery("");
		onChange(componentName);
		toggleIsOpen(false);
	};

	return (
		<div className="relative flex-1 max-w-md">
			<SearchField
				ref={anchorRef}
				autoFocus
				fullWidth
				// Ensure menu closes on Blur, but with a timeout to allow clicks
				onBlur={() => setTimeout(() => toggleIsOpen(false), 200)}
				onChange={handleSearch}
				onFocus={() => query.length > 0 && toggleIsOpen(true)}
				placeholder="Search components..."
				value={query}
			/>

			<Menu
				anchorRef={anchorRef}
				className="w-full left-0 right-0"
				highlightedIndex={-1}
				onChange={() => {}} // TODO: Implement keyboard navigation and selection
				onClose={() => toggleIsOpen(false)}
				onHighlightedIndexChange={() => {}}
				open={isOpen}>

				{matches.length > 0
				? (matches.map(component => (
				<MenuItem
					key={component}
					fullWidth
					onClick={() => handleItemClick(component)}>
					{component}
				</MenuItem>
				)))
				: (
				<MenuItem fullWidth disabled>
					{`No components found for "${query}"`}
				</MenuItem>
				)}

			</Menu>
		</div>
	);
};

export default HeaderSearch;
