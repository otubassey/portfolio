"use client";

import { ReactNode, Ref } from "react";

import {CssUtils} from "../../utils";

import { Icon, IconName, IconProps } from "../icon";

export interface InputIconProps extends Omit<IconProps, "ref"> {
	size: IconProps["size"];
	className?: string;
	icon?: IconName | ReactNode;
	iconProps?: Partial<IconProps>;
	ref?: Ref<HTMLSpanElement>;
}

const InputIcon = ({
	size,
	className,
	icon,
	iconProps,
	ref,
	...props
}: InputIconProps) => {
	if(!icon) return null;

	return (
		<span
			ref={ref}
			className={CssUtils.mergeClasses(
				"inline-flex shrink-0",
				className
			)}>
			{typeof icon === "string"
				? (<Icon name={icon as IconName} size={size} {...iconProps} {...props} />)
				: (icon)
			}
		</span>
	);
};

InputIcon.displayName = "InputIcon";

export default InputIcon;
