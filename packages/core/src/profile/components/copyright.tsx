"use client";

import { CssUtils, Text } from "@otuekong-portfolio/design-system";

interface CopyrightProps {
    className?: string;
    name?: string;
}

const Copyright = ({
	className,
	name
}: CopyrightProps) => (
    <div
		className={CssUtils.mergeClasses("flex justify-between items-center", className)}>
		<Text muted size="small">
			© {new Date().getFullYear()} {name ?? "Replace with actual name"}. All rights reserved.
		</Text>
    </div>
);

export default Copyright;
