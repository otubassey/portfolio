"use client";

import { ElementType, ReactNode } from "react";

import { Typography } from "../../components";

import { usePlayground } from "../context";

interface PlaygroundPreviewProps {
	children?: ReactNode;
	component?: ElementType;
}

const PlaygroundPreview = ({
	children,
	component: Component
}: PlaygroundPreviewProps) => {
	const { previewProps } = usePlayground();

	let content: ReactNode = children;

	if(!content && Component) {
		content = <Component {...previewProps} />;
	}

	if(!content) {
		content = <Typography color="muted">No preview available</Typography>;
	}

	return (
		<div>
			<Typography variant="h6" className="mb-4">Preview</Typography>
			<div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-8 flex items-center justify-center min-h-[200px]">
				{content}
			</div>
		</div>
	);
}

PlaygroundPreview.displayName = "PlaygroundPreview";

export default PlaygroundPreview;
