"use client";

import { ReactNode, Ref } from "react";

import { CssUtils } from "../../utils";

export interface FooterProps {
	children?: ReactNode;
	className?: string;
	ref?: Ref<HTMLDivElement>;
}

const Footer = ({
	children,
	className,
	ref
}: FooterProps) => {
	return (
		<footer
			ref={ref}
			className={CssUtils.mergeClasses(
				"pb-4 pt-2 px-[50px] border-t border-slate-200 dark:border-slate-600 bg-white dark:bg-gray-800",
				className
			)}>
			{children}
		</footer>
	);
};

Footer.displayName = "Footer";

export default Footer;
