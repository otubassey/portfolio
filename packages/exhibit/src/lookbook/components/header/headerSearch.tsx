"use client";

import { useState, useMemo, useRef } from "react";

import {
	CssUtils,
	Menu,
	MenuItem,
	SearchField,
	StringUtils,
	useToggle
} from "@otuekong-portfolio/curio";
import { Breadcrumb } from "@otuekong-portfolio/features";

interface HeaderSearchProps {
	onItemClick: (text: string) => void;
	searchItems: ReadonlyArray<Breadcrumb>;
	className?: string;
}

const HeaderSearch = ({
	onItemClick,
	searchItems,
	className
}: HeaderSearchProps) => {
	const anchorRef = useRef<HTMLInputElement>(null);

	const [query, setQuery] = useState("");
	const [isOpen, toggleIsOpen] = useToggle(false);

	const matchedSearchItems = useMemo(() => {
		if(!query.trim()) return [];
		return searchItems.filter(breadcrumb => (
			breadcrumb.name.toLowerCase().includes(query.toLowerCase())
		));
	}, [query, searchItems]);

	const handleBlur = () => {
		// Ensure menu closes on Blur, but with a timeout to allow clicks
		setTimeout(() => toggleIsOpen(false), 200);
	};

	const handleFocus = () => {
		if(query.length > 0) {
			toggleIsOpen(true);
		}
	};

	const handleSearch = (value: string) => {
		setQuery(value);
		toggleIsOpen(value.length > 0);
	};

	const handleItemClick = (componentName: string) => {
		setQuery("");
		onItemClick(componentName);
		toggleIsOpen(false);
	};

	return (
		<div className={CssUtils.mergeClasses("relative", className)}>
			<SearchField
				ref={anchorRef}
				autoFocus
				fullWidth
				onBlur={handleBlur}
				onChange={handleSearch}
				onFocus={handleFocus}
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

				{!matchedSearchItems.length && (
				<MenuItem fullWidth disabled>
					{`No components found for "${query}"`}
				</MenuItem>
				)}

				{matchedSearchItems.length > 0 && (
				matchedSearchItems.map(breadcrumb => {
					if(breadcrumb.active && (
						matchedSearchItems.length === 1 ||
						StringUtils.equalsIgnoreCase(breadcrumb.name, query)
					)) {
						return (
							<MenuItem fullWidth disabled>
								{`"${query}" is currently active`}
							</MenuItem>
						);
					}
					return (
						<MenuItem
							key={breadcrumb.name}
							fullWidth
							onClick={() => handleItemClick(breadcrumb.name)}>
							{breadcrumb.name}
						</MenuItem>
					);
				}))}

			</Menu>
		</div>
	);
};

export default HeaderSearch;
