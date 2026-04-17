"use client";

import { ComponentManifest, Heading, StatusChip } from "@otuekong-portfolio/curio";

const LOOKBOOK_STATUS_MAPPING = {
	stable: { color: "success", label: "Stable" },
	unknown: { color: "default", label: "Unknown" },
	unstable: { color: "warning", label: "Unstable" }
};

interface ComponentHeadingProps<T extends string> {
	name?: T | null;
	status?: ComponentManifest["status"];
}

function ComponentHeading<T extends string>({
	name,
	status
}: ComponentHeadingProps<T>) {
	return (
		<div className="flex items-center gap-3">
			<Heading level={1}>{name ?? "Not Available"}</Heading>

			<StatusChip
				status={status ?? "unknown"}
				statusMapping={LOOKBOOK_STATUS_MAPPING}
				srOnlyPrefix="Status: "
				size="medium"
			/>

		</div>
	);
}

export default ComponentHeading;
