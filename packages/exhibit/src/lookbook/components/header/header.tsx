"use client";

import {
	CssUtils,
	ErrorBoundary,
	Icon,
	IconButton,
	ToggleIconButton,
	Typography
} from "@otuekong-portfolio/curio";

import HeaderSearch from "./headerSearch";

interface HeaderProps {
	componentNames: Array<string>;
	isDarkMode: boolean;
	isMobileMenuOpen: boolean;
	isMobileSearchOpen: boolean;
	onIsMobileMenuToggle: () => void;
	onIsMobileSearchOpenToggle: (open: boolean) => void;
	onSearchComponent: (text: string) => void;
	onThemeToggle: () => void;
	className?: string;
}

function Header({
	componentNames,
	isDarkMode = false,
	isMobileMenuOpen = false,
	isMobileSearchOpen = false,
	onIsMobileMenuToggle,
	onIsMobileSearchOpenToggle,
	onSearchComponent,
	onThemeToggle,
	className = ""
}: HeaderProps) {
	return (
		<ErrorBoundary>
			<header
				className={CssUtils.mergeClasses(
					"fixed top-0 left-0 right-0",
					"bg-white dark:bg-gray-800 text-gray-900",
					"text-gray-900 dark:text-gray-100",
					"border-b border-gray-200 dark:border-gray-700 shadow-sm",
					"z-ps-appbar",
					className
				)}>
				<div className="flex items-center h-16 px-4">
					<ToggleIconButton
						checked={isMobileMenuOpen}
						checkedIcon="x"
						className="md:hidden"
						icon="menu"
						onToggle={onIsMobileMenuToggle}
						size="medium"
					/>

					<div className="flex items-center gap-2 md:mr-8 ml-2 md:ml-0">
						<Icon name="book" className="text-blue-500" size={28} />
						<Typography component="span" variant="h6" weight="bold" className="hidden sm:inline">
							Lookbook
						</Typography>
					</div>

					{/* Desktop: Search Bar */}
					<div className="hidden md:flex flex-1 max-w-md mx-8">
						<HeaderSearch
							components={componentNames}
							onChange={onSearchComponent}
						/>
					</div>

					{/* Right side buttons */}
					<div className="flex items-center gap-2 ml-auto">
						{/* Mobile: Search Icon Toggle */}
						<IconButton
							aria-label="Search"
							className="md:hidden"
							icon="search"
							onClick={() => onIsMobileSearchOpenToggle(!isMobileSearchOpen)}
							size="medium"
						/>

						{/* Theme Toggle */}
						<ToggleIconButton
							checked={!isDarkMode}
							checkedIcon="moon"
							icon="sun"
							onToggle={onThemeToggle}
							size="medium"
						/>
					</div>
				</div>

				{/* Mobile: Search Bar Expansion */}
				{isMobileSearchOpen && (
				<div className="md:hidden px-4 pb-4 animate-in fade-in slide-in-from-top-2">
					<HeaderSearch
						components={componentNames}
						onChange={onSearchComponent}
					/>
				</div>
				)}
			</header>
		</ErrorBoundary>
	);
}

export default Header;
