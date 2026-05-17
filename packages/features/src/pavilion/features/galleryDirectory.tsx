"use client";

import { Fragment, useMemo, useRef } from "react";

import { ListSubHeader, Menu, MenuItem, Text, useToggle } from "@otuekong-portfolio/curio";

import { MenuButton } from "../../components";
import { ExhibitLabel, ExhibitLabelValue } from "../../features";

export const groupGalleriesByFamily = (
	items: ReadonlyArray<GalleryDirectoryItem>
): Record<string, ReadonlyArray<GalleryDirectoryItem>> => {
	return items.reduce((acc, item) => {
		const { family } = item;

		return {
			...acc,
			[family]: [...(acc[family] ?? []), item]
		};
	}, {} as Record<string, GalleryDirectoryItem[]>);
};

export interface GalleryDirectoryItem {
	family: string;
	value: string;
}

export interface GalleryDirectoryProps {
	items: ReadonlyArray<GalleryDirectoryItem>;
	onItemSelect: (item: GalleryDirectoryItem) => void;
	selectedItem: GalleryDirectoryItem | null;
	className?: string;
}

function GalleryDirectory({
	items: itemsProp,
	onItemSelect,
	selectedItem,
	className
}: GalleryDirectoryProps) {
	const items = (Array.isArray(itemsProp) ? itemsProp : []) as ReadonlyArray<GalleryDirectoryItem>;
	const anchorRef = useRef<HTMLButtonElement>(null);
	const [showPortfolioProjectDropdown, toggleShowPortfolioProjectDropdown] = useToggle(false);

	const galleriesByFamily = useMemo(() => {
		if(items.length) {
			return groupGalleriesByFamily(items);
		}
		return null;
	}, [items]);

	const isGalleriesByFamilyEmpty = !galleriesByFamily || !Object.keys(galleriesByFamily).length;

	const onlyEntry = !isGalleriesByFamilyEmpty
		&& Object.keys(galleriesByFamily).length === 1
		&& galleriesByFamily[Object.keys(galleriesByFamily)[0]].length === 1
		? galleriesByFamily[Object.keys(galleriesByFamily)[0]][0]
		: null;

	if(isGalleriesByFamilyEmpty || onlyEntry) {
		return (
			<ExhibitLabel
				className={className}
				family={onlyEntry?.family}
				value={onlyEntry?.value}
			/>
		);
	}

	return (
		<div className="relative">
			<MenuButton
				ref={anchorRef}
				endIcon={showPortfolioProjectDropdown ? "chevron-up" : "chevron-down"}
				endIconProps={{ size: 14 }}
				onClick={toggleShowPortfolioProjectDropdown}>

				{!selectedItem
				? (
				<Text className="italic">
					Select App
				</Text>)
				: (
				<ExhibitLabelValue
					family={selectedItem.family}
					value={selectedItem.value}
				/>)}

			</MenuButton>

			<Menu
				anchorRef={anchorRef}
				highlightedIndex={-1}
				onChange={() => {}} // TODO: Implement keyboard navigation and selection
				onClose={() => toggleShowPortfolioProjectDropdown(false)}
				onHighlightedIndexChange={() => {}}
				open={showPortfolioProjectDropdown}>

				{Object.entries(galleriesByFamily).map(([family, galleryDirectoryItems]) => (

				<Fragment key={family}>
					<ListSubHeader>{family}</ListSubHeader>
					{galleryDirectoryItems.map((galleryDirectoryItem: GalleryDirectoryItem) => (
					<MenuItem
						key={galleryDirectoryItem.value}
						onClick={() => {
							onItemSelect(galleryDirectoryItem);
							toggleShowPortfolioProjectDropdown(false);
						}}
						selected={galleryDirectoryItem.value === selectedItem?.value}>
						{galleryDirectoryItem.value}
					</MenuItem>
					))}
				</Fragment>
				))}

			</Menu>
		</div>
    );
}

export default GalleryDirectory;
