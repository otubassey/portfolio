import { ReactNode } from "react";

import { Surface, SurfaceProps } from "../surface";

import { CssUtils } from "../../utils";

export interface BadgeOwnProps {
	children: ReactNode;
	className?: string;
	rounded?: boolean;
}

export type BadgeProps = BadgeOwnProps & Omit<SurfaceProps<"div">, keyof BadgeOwnProps>;

const Badge = ({
	children,
	className,
	elevation = 1,
	rounded = false,
	...props
}: BadgeProps) => {
	return (
		<Surface
			elevation={elevation}
			className={CssUtils.mergeClasses(
				"inline-flex items-center justify-center",
				rounded ? "rounded-2xl" : "rounded-xl",
				className
			)}
			{...props}>
			{children}
		</Surface>
	);
};

Badge.displayName = "Badge";

export default Badge;
