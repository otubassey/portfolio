"use client";

import { ElementType, MouseEvent } from "react";

import { useToggle } from "../../hooks";
import { CssUtils } from "../../utils";

import { ButtonBase, ButtonBaseProps } from "../buttonBase";
import { Icon } from "../icon";
import { Typography } from "../typography";

export type CopyButtonProps<T extends ElementType = "button"> =
	Omit<ButtonBaseProps<T>, "children">
	& {
		value: string;
		className?: string;
		onClick?: (event: MouseEvent) => void;
		onCopyChange?: (value: boolean) => void;
		ref?: React.Ref<T>;
	};

function CopyButton({
	value,
	className,
	onClick,
	onCopyChange,
	ref,
	...props
}: CopyButtonProps) {
	const [isCopied, toggleIsCopied] = useToggle(false);

	const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
		if(!value) return;

		try {
			await navigator.clipboard.writeText(value);

			toggleIsCopied(true);
			onCopyChange?.(true);

			// Reset after 2 seconds
			setTimeout(() => {
				toggleIsCopied(false);
				onCopyChange?.(false);
			}, 2000);
		} catch (err) {
			console.error(`Failed to copy text: '${value}' with error: `, err);
		}

		onClick?.(event);
	};

	return (
		<ButtonBase
			ref={ref}
			aria-label={isCopied ? "Copied" : "Copy to clipboard"}
			aria-pressed={isCopied}
			className={CssUtils.mergeClasses(
				"rounded-md transition-all shadow-sm flex items-center gap-2 text-xs",
				"text-gray-400 dark:text-gray-300 px-2 py-1 hover:bg-white/10",
				className
			)}
			onClick={handleClick}
			{...props}>

			<Icon
				name={isCopied ? "check" : "copy"}
				size={16}
				className={isCopied ? "text-green-500" : "text-gray-400"}
			/>
			<Typography color="primary" variant="caption" weight="medium">
				{isCopied ? "Copied" : "Copy"}
			</Typography>

		</ButtonBase>
	);
}

CopyButton.displayName = "CopyButton";

export default CopyButton;
