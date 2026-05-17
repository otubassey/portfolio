"use client";

import { ReactNode, Ref } from "react";

import { CssUtils } from "../../utils";

import { Icon, IconName, IconProps } from "../icon";

export interface ListItemIconProps extends Omit<IconProps, "name" | "ref"> {
	children?: ReactNode;
	className?: string;
	icon?: IconName | ReactNode;
	ref?: Ref<HTMLDivElement>;
}

const ListItemIcon = ({
	children,
	className,
	icon,
	ref,
	...props
}: ListItemIconProps) => (
	<div
		ref={ref}
		className={CssUtils.mergeClasses(
			"min-w-[40px] flex-shrink-0 flex text-slate-500",
			className
		)}>
		{children || (typeof icon === "string"
			? (
				<Icon
					aria-hidden="true"
					className={`icon-${icon} text-lg`}
					name={icon as IconName}
					{...props}
				/>
			)
			: (icon)
		)}
	</div>
);

ListItemIcon.displayName = "ListItemIcon";

export default ListItemIcon;
