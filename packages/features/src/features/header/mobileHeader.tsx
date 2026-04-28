"use client";

import { JSX, MouseEvent, ReactNode } from "react";

import {
	CssUtils,
	Icon,
	OnToggleTheme,
	Text,
	ToggleIconButton
} from "@otuekong-portfolio/curio";

import { Breadcrumb, NavigationList, OnNavigateHandler } from "../../navigation";

import { MenuButton } from "../../components";

import AuthorInfo from "./authorInfo";

export interface MobileHeaderProps {
	breadcrumbs: ReadonlyArray<Breadcrumb>;
	isDarkMode: boolean;
	isMenuOpen: boolean;
	onBreadcrumbSelect: OnNavigateHandler;
	onToggleTheme: OnToggleTheme;
	toggleIsMenuOpen: (value?: unknown) => void;
	children?: ReactNode;
	className?: string;
}

function MobileHeader({
	breadcrumbs,
	isDarkMode,
	isMenuOpen,
	onBreadcrumbSelect,
	onToggleTheme,
	toggleIsMenuOpen,
	children,
	className
}: MobileHeaderProps): JSX.Element {
	const handleNavigate = (targetName: string) => {
		onBreadcrumbSelect(targetName);
		toggleIsMenuOpen(false);
	};

	const handleToggleIsDarkMode = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		onToggleTheme();
		toggleIsMenuOpen(false);
	};

	return (
		<header
			className={CssUtils.mergeClasses(
				"lg:hidden fixed top-0 left-0 right-0 z-[var(--z-index-ps-appbar)] transition-colors",
				"border-b border-[var(--portfolio-divider-color)]",
				"bg-[var(--portfolio-surface-bg-light)]",
				className
			)}>
			<div className="flex items-center justify-between px-4 py-3">
				<AuthorInfo />

				<ToggleIconButton
					aria-label="Toggle menu"
					checked={isMenuOpen}
					checkedIcon="close"
					className="text-[var(--portfolio-typography-text-default)]"
					color="inherit"
					icon="menu"
					onToggle={toggleIsMenuOpen}
				/>
			</div>

			{isMenuOpen && (
			<nav className="flex flex-col max-h-[calc(100vh-64px)] overflow-y-auto bg-[var(--portfolio-surface-bg-main)]">
				<div className="px-4 py-3 border-t border-[var(--portfolio-divider-color)]">
					{children}
				</div>

				<div className="flex-1 overflow-y-auto border-t border-[var(--portfolio-divider-color)]">
					<NavigationList
						breadcrumbs={breadcrumbs}
						onNavigate={handleNavigate}
					/>
				</div>

				<div className="px-4 py-4 border-t border-[var(--portfolio-divider-color)] bg-[var(--portfolio-surface-bg-sunken)]">
					<MenuButton
						className="w-full rounded-[var(--radius-ps-card)]"
						onClick={handleToggleIsDarkMode}>
						<span className="flex items-center justify-between w-full">
							<Text size="small">Theme</Text>
							<span className="flex items-center gap-2 min-w-0">
								<Icon name={isDarkMode ? "sun" : "moon"} size={16} className="flex-shrink-0" />
								<Text size="small">{isDarkMode ? "Light" : "Dark"}</Text>
							</span>
						</span>
					</MenuButton>
				</div>
			</nav>
			)}
		</header>
	);
}

export default MobileHeader;
