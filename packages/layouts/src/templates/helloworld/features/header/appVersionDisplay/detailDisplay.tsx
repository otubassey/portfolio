import { memo } from "react";

import { Icon, Text } from "@otuekong-portfolio/design-system";

interface DetailDisplayProps {
	family: string;
	version: string;
}

function DetailDisplay({
	family,
	version
}: DetailDisplayProps) {
	return (
		<span className="flex items-center gap-1">
			<Icon name="gitbranch" size={16} />
			<Text size="small">{family}</Text>
			<Text className="text-gray-400" size="small">@</Text>
			<Text color="primary" size="small">{version}</Text>
		</span>
	);
}

export default memo(DetailDisplay);
