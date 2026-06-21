"use client";

import { ElementType, MouseEvent, MouseEventHandler, ReactNode } from "react";

import {
	Alert,
	Collapse,
	CssUtils,
	IconName,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	ListProps,
	Typography,
	useToggle
} from "@otuekong-portfolio/curio";

import BreadcrumbUtils from "./breadcrumbUtils";
import { Breadcrumb, BreadcrumbTree, GroupedBreadcrumbs, OnNavigateHandler } from "./types";

interface ListNodeItemProps {
	children: ReactNode;
	className?: string;
	disabled?: boolean;
	endIcon?: IconName | ReactNode;
	listStyleType?: ListProps["listStyleType"];
	onClick?: MouseEventHandler<HTMLButtonElement | HTMLLIElement>;
	selected?: boolean;
	startIcon?: IconName | ReactNode;
}

function ListNodeItem({
	children,
	className,
	disabled = false,
	endIcon,
	listStyleType,
	onClick,
	selected = false,
	startIcon,
}: ListNodeItemProps) {
	if(listStyleType === "stretch") {
		return (
			<ListItem
				button
				className={className}
				disabled={disabled}
				onClick={onClick}
				selected={selected}>
				<ListItemText primary={children} />
			</ListItem>
		);
	}
	return (
		<ListItemButton
			className={CssUtils.mergeClasses(
				"w-full text-left px-3 py-2 rounded-lg transition-colors",
				selected
					? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
					: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
				className
			)}
			disabled={disabled}
			endIcon={endIcon}
			onClick={onClick}
			startIcon={startIcon}>
			{children}
		</ListItemButton>
	);
}

ListNodeItem.displayName = "NavigationList.ListNodeItem";

const MAX_NESTING_DEPTH = 3;

interface ListNodeProps {
	depth: number;
	onNavigate: OnNavigateHandler;
	view: BreadcrumbTree;
	disabled?: boolean;
	listStyleType?: ListProps["listStyleType"];
}

function ListNode({
	depth = 0,
	onNavigate,
	view,
	disabled = false,
	listStyleType = "none"
}: ListNodeProps) {
	const [isExpanded, toggleIsExpanded] = useToggle(false);

	const hasChildren = Array.isArray(view.children) && view.children.length > 0;

	if(depth > MAX_NESTING_DEPTH) {
		return (
			<Alert
				severity="error"
				message={`Maximum nesting depth of ${MAX_NESTING_DEPTH} exceeded for section "${view.name}".`}
			/>
		);
	}

	const handleNodeClick = (event: MouseEvent<HTMLButtonElement | HTMLLIElement>) => {
		if(disabled) {
			return;
		}
		if(hasChildren) {
			event.stopPropagation();
			toggleIsExpanded();
		} else {
			onNavigate(view.name);
		}
	};

	return (
		<div className="flex flex-col w-full">
			<ListNodeItem
				// Indent sub-items slightly more for visual hierarchy
				className={depth > 0 ? `ml-${depth * 2}` : ""}
				disabled={disabled}
				endIcon={hasChildren ? (isExpanded ? "chevron-up" : "chevron-down") : undefined}
				listStyleType={listStyleType}
				onClick={handleNodeClick}
				selected={view.active}
				startIcon={view.icon}>

				{view.name}

			</ListNodeItem>

			{hasChildren && (
			<Collapse expand={isExpanded}>

				<div className="max-h-80 overflow-y-auto overflow-x-hidden scrollbar-hide hover:scrollbar-default transition-all">

					<List className="flex flex-col py-1 ml-4 border-l border-gray-200 dark:border-gray-700">

						{view.children!.map((child) => (
						<ListNode
							key={child.name}
							depth={depth + 1}
							disabled={disabled}
							listStyleType={listStyleType}
							onNavigate={onNavigate}
							view={child}
						/>
						))}

					</List>

				</div>
			</Collapse>
			)}
		</div>
	);
}

ListNode.displayName = "NavigationList.NestedListItem";

interface NavigationListProps<T extends string> {
	breadcrumbs: ReadonlyArray<Breadcrumb>;
	onNavigate: OnNavigateHandler;
	component?: ReactNode;
	disabled?: boolean;
	flatten?: boolean;
	id?: string;
	listProps?: ListProps;
	registry?: Record<T, ReadonlyArray<string>>;
}

function NavigationList<T extends string>({
	breadcrumbs,
	onNavigate,
	component,
	disabled = false,
	flatten = false,
	id,
	listProps,
	registry
}: NavigationListProps<T>) {
	if(!Array.isArray(breadcrumbs) || !breadcrumbs.length) {
		return (
			<Alert
				severity="info"
				message="No navigation items to display"
			/>
		);
	}

	const Renderable = (component || List) as ElementType;

	const { listStyleType = "none", ...restListProps} = listProps || {};

	if(flatten) {
		return (
			<Renderable disabled={disabled} {...listProps} className="space-y-1">
				{BreadcrumbUtils.getNavigableItems(breadcrumbs).map((item) => (
					<ListNodeItem
						key={item.name}
						disabled={disabled}
						listStyleType={listStyleType}
						onClick={() => onNavigate(item.name)}
						selected={item.active}
						startIcon={item.icon}>
						{item.name}
					</ListNodeItem>
				))}
			</Renderable>
		);
	}

	if(registry) {
		const groupedBreadcrumbs = BreadcrumbUtils.groupByRegistry(breadcrumbs, registry);

		return (
			<div className="space-y-6">
				{Object.entries(groupedBreadcrumbs)
					.filter(([cat, items]) => cat !== "Uncategorized" && items.length > 0)
					.map(([category, items]) => (
						<div key={category}>
							<Typography
								className="font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-3"
								color={disabled ? "muted" : "inherit"}
								variant="caption">
								{category}
							</Typography>
							<Renderable {...listProps} className="space-y-1">
								{items.map((item) => (
									<ListNodeItem
										key={item.name}
										disabled={disabled}
										listStyleType={listStyleType}
										onClick={() => onNavigate(item.name)}
										selected={item.active}
										startIcon={item.icon}>
										{item.name}
									</ListNodeItem>
								))}
							</Renderable>
						</div>
					))}
			</div>
		);
	}

	const breadcrumbTree = BreadcrumbUtils.groupByFamily(breadcrumbs);

	return (
		<Renderable
			{...restListProps}
			className="p-4 space-y-1"
			component="nav"
			disabled={disabled}
			id={id}
			listStyleType={listStyleType}>
			{breadcrumbTree.map(view => (
			<ListNode
				key={view.name}
				depth={1}
				disabled={disabled}
				listStyleType={listStyleType}
				onNavigate={onNavigate}
				view={view}
			/>
			))}
		</Renderable>
	);
}

NavigationList.displayName = "NavigationList";

export default NavigationList;
