import { ElementType } from "react";

import { CssUtils } from "../../utils";

import { Button, ButtonProps } from "../button";

export type InlineButtonProps<T extends ElementType = "button"> = ButtonProps<T>;

const InlineButton = <T extends ElementType = "button">({
	className,
	color = "primary",
	textTransform = "none",
	variant = "text",
	...props
}: InlineButtonProps<T>) => {
	return (
		<Button
			{...(props as ButtonProps<T>)}
			className={CssUtils.mergeClasses(
				"p-1 min-w-0 h-auto vertical-baseline inline",
				className
			)}
			color={color}
			textTransform={textTransform}
			variant={variant}
		/>
	);
};

InlineButton.displayName = "InlineButton";

export default InlineButton;
