import { JSX, MouseEvent, ReactNode, Ref } from "react";

import { Button, ButtonProps, CssUtils } from "@otuekong-portfolio/design-system";

interface MenuButtonProps extends ButtonProps {
	children: ReactNode;
	className?: string;
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
	ref?: Ref<HTMLButtonElement>;
}

function MenuButton({
	children,
	className,
	onClick,
	ref,
	...props
}: MenuButtonProps): JSX.Element {
	return (
		<Button
			{...props}
			ref={ref}
			className={CssUtils.mergeClasses(
				"flex items-center justify-between gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700",
				"border border-gray-300 dark:border-gray-600 rounded-lg",
				"text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors",
				className
			)}
			fullWidth
			justify="between"
			onClick={onClick}
			size="small">
			{children}
		</Button>
	);
}

export default MenuButton;
