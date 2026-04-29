import { memo } from "react";

import { Icon, Text } from "@otuekong-portfolio/curio";

interface ExhibitLabelValueProps {
	family: string | null | undefined;
	value: string | null | undefined;
}

function ExhibitLabelValue({
	family,
	value
}: ExhibitLabelValueProps) {
	return (
		<span className="flex items-center gap-1">
			<Icon name="gitbranch" size={16} />
			<Text size="small">{family ?? `Unknown family: '${family}'`}</Text>
			<Text className="text-gray-400" size="small">/</Text>
			<Text color="primary" size="small">{value ?? `Unknown value: '${value}'`}</Text>
		</span>
	);
}

export default memo(ExhibitLabelValue);
