"use client";

import { JSX, MouseEvent, ReactNode, useEffect, useState } from "react";

import { Button, CssUtils, IconName, OnToggleTheme, Text, ToggleIconButton } from "@otuekong-portfolio/curio";

import { Breadcrumb, OnNavigateHandler } from "../../navigation";

import AuthorInfo from "./authorInfo";

interface HeaderNavigationItem {
	active: boolean;
	name: string;
	hide?: boolean;
	icon?: IconName | null;
}

function mapInitialNavigationItems(
	breadcrumbs: ReadonlyArray<Breadcrumb>
): ReadonlyArray<HeaderNavigationItem> {
	const crumbs = Array.isArray(breadcrumbs) ? breadcrumbs : [];
	return crumbs
		.filter((breadcrumb: Breadcrumb) => !breadcrumb.parent)
		.map(({name, active, icon}: Breadcrumb) => ({
			name,
			active,
			hide: false,
			icon
		}));
}

export interface DesktopHeaderProps {
	breadcrumbs: ReadonlyArray<Breadcrumb>;
	isDarkMode: boolean;
	onBreadcrumbSelect: OnNavigateHandler;
	onToggleTheme: OnToggleTheme;
	children?: ReactNode;
	className?: string;
}

function DesktopHeader({
	breadcrumbs,
	isDarkMode = false,
	onBreadcrumbSelect,
	onToggleTheme,
	children,
	className
}: DesktopHeaderProps): JSX.Element {
	const [navigationItems, setNavigationItems] = useState<ReadonlyArray<HeaderNavigationItem>>(mapInitialNavigationItems(breadcrumbs));

	const handlePageSelect = (event: MouseEvent<HTMLButtonElement>) => {
		const navigationItemName = event.currentTarget.getAttribute("data-page") || "";
		onBreadcrumbSelect(navigationItemName);
	};

	useEffect(() => {
		const nextBreadcrumbs = Array.isArray(breadcrumbs) ? breadcrumbs : [];
		setNavigationItems(mapInitialNavigationItems(nextBreadcrumbs));
	}, [breadcrumbs]);

	return (
		<header
			className={CssUtils.mergeClasses(
				"hidden lg:flex",
				"items-center justify-between px-8 py-3",
				className
			)}>
			<div className="flex items-center justify-between w-full">
				<AuthorInfo />

				{navigationItems.length > 1 && (
				<nav className="flex gap-2">
					{navigationItems.map((navigationItem: HeaderNavigationItem) => (
					<Button
						key={navigationItem.name}
						aria-label={`Switch to ${navigationItem.name} view`}
						className={CssUtils.mergeClasses(
							"flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",
							navigationItem.active
								? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
								: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
						)}
						data-page={navigationItem.name}
						disabled={navigationItems.length === 1}
						onClick={handlePageSelect}
						startIcon={navigationItem.icon as IconName}
						variant="text">
						{/* TODO: On hover make the color match the icon */}
						<Text
							className="hidden sm:inline ml-2"
							color={navigationItem.active ? "primary" : "default"}>
							{navigationItem.name}
						</Text>
					</Button>
					))}
				</nav>
				)}

				<div className="flex items-center gap-3">
					{children}

					<ToggleIconButton
						checked={isDarkMode}
						icon="moon"
						checkedIcon="sun"
						onToggle={onToggleTheme}
					/>
				</div>
			</div>
		</header>
	);
}

export default DesktopHeader;
