"use client";

import { AnchorHTMLAttributes, ReactNode, ElementType, Ref } from "react";

import { CssUtils } from "../../utils";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
	children?: ReactNode;
	className?: string;
	color?: "primary" | "inherit";
	component?: ElementType;
	ref?: Ref<HTMLAnchorElement>;
	title?: string;
	underline?: "none" | "hover" | "always";
}

const Link = ({
	href,
	"aria-label": ariaLabel,
	children,
	className,
	color = "primary",
	component,
	ref,
	title,
	underline = "hover",
	...props
}: LinkProps) => {
    const isExternal = href.startsWith("http");
	const isSystemProtocol = href.startsWith("mailto:") || href.startsWith("tel:");

    const baseStyles = CssUtils.mergeClasses(
		"transition-colors duration-200 cursor-pointer",
		color === "primary" ? "text-blue-600 hover:text-blue-500" : "text-inherit",
		underline === "none" && "no-underline",
		underline === "hover" && "no-underline hover:underline",
		underline === "always" && "underline",
		className
    );

    if(isExternal || isSystemProtocol) {
		return (
			<a
				aria-label={ariaLabel || title}
				className={baseStyles}
				href={href}
				ref={ref}
				title={title}
				{...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
				{...props}>
				{children}
			</a>
		);
    }

    const Renderable = (component || "a") as ElementType;
    return (
		<Renderable
			className={baseStyles}
			ref={ref}
			{...(Renderable === "a" ? { href } : { to: href })}
			{...props}>
			{children}
		</Renderable>
    );
};

Link.displayName = "Link";

export default Link;
