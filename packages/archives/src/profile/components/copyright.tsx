"use client";

import { CssUtils, Text } from "@otuekong-portfolio/curio";

import { PERSONA_INFO } from "../data";

interface CopyrightProps {
    className?: string;
}

const Copyright = ({
	className
}: CopyrightProps) => (
    <div
		className={CssUtils.mergeClasses("flex justify-between items-center", className)}>
		<Text muted size="small">
			© {new Date().getFullYear()} {PERSONA_INFO.name.full}. All rights reserved.
		</Text>
    </div>
);

Copyright.displayName = "Copyright";

export default Copyright;
