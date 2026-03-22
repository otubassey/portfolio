"use client";

import { Ref } from "react";

import { CssUtils, Icon, IconName, Link } from "@otuekong-portfolio/design-system";

import { ProfessionalNetwork } from "../data";

interface ProfessionalLinkItem {
	href: string;
	icon: IconName;
	label: string;
}

interface ProfessionalLinkButtonsProps {
	exclude?: Array<ProfessionalLinkItem>;
	only?: Array<ProfessionalLinkItem>;
	className?: string;
	ref?: Ref<HTMLDivElement>;
}

const ProfessionalLinkButtons = ({
	exclude = [],
	only = [],
	className = "",
	ref
}: ProfessionalLinkButtonsProps) => {
	const sourceList = (only || Object.values(ProfessionalNetwork) || []) as Array<ProfessionalLinkItem>;
	const visibleLinks = sourceList.filter(link => !exclude.includes(link));

	return (
		<div
			ref={ref}
			className={CssUtils.mergeClasses("flex items-center gap-4", className)}>
			{visibleLinks.map(link => (
			<Link
				key={link.href}
				className={CssUtils.mergeClasses(
					"rounded-lg p-4 transition-colors",
					"bg-slate-200 hover:bg-slate-300",
					"dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
				)}
				href={link.href}
				title={link.label}>
				<Icon name={link.icon} fill="none" size={20} />
			</Link>
			))}
		</div>
	);
};

export default ProfessionalLinkButtons;
