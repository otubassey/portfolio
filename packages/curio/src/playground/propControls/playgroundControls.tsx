"use client";

import { ReactNode, useEffect } from "react";

import { Typography } from "../../components";

import { usePlayground } from "../context";

interface PlaygroundControlsProps {
	children: ReactNode;
	onChange?: (newProps: Record<string, any>) => void;
}

const PlaygroundControls = ({
	children,
	onChange
}: PlaygroundControlsProps) => {
	const { controlProps } = usePlayground();

	useEffect(() => {
		onChange?.(controlProps);
	}, [controlProps]);

	return (
		<div>
			<Typography variant="h6" className="mb-4">Controls</Typography>
			<div className="space-y-4">
				{children}
			</div>
		</div>
	);
};

PlaygroundControls.displayName = "PlaygroundControls";

export default PlaygroundControls;
