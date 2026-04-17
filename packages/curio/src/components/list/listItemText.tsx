"use client";

import { ReactNode, Ref } from "react";

import { CssUtils } from "../../utils";

import { Text, TextProps } from "../text";

export interface ListItemTextProps {
	primary: ReactNode;
	className?: string;
	primaryTextProps?: Omit<TextProps, "children">;
	ref?: Ref<HTMLDivElement>;
	secondary?: ReactNode;
	secondaryTextProps?: Omit<TextProps, "children">;
}

const ListItemText = ({
	primary,
	className,
	primaryTextProps,
	ref,
	secondary,
	secondaryTextProps
}: ListItemTextProps) => {
	return (
		<div ref={ref} className={CssUtils.mergeClasses("flex-auto min-w-0 my-1", className)}>
			<Text {...primaryTextProps}>{primary}</Text>
			{secondary && <Text muted size="small" {...secondaryTextProps}>{secondary}</Text>}
		</div>
	);
};

ListItemText.displayName = "ListItemText";

export default ListItemText;
