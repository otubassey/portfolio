"use client";

import { ComponentManifest, Heading, StatusChip } from "@otuekong-portfolio/design-system";

const LOOKBOOK_STATUS_MAPPING = {
	stable: { color: "success", label: "Stable" },
	unstable: { color: "warning", label: "Unstable" }
};

interface ComponentDocumentationHeadingProps<T extends string> {
	name?: T | null;
	status?: ComponentManifest["status"];
}

function ComponentDocumentationHeading<T extends string>({
	name,
	status
}: ComponentDocumentationHeadingProps<T>) {
	return (
		<div className="flex items-center gap-3">
			<Heading level={1}>{name ?? "Not Available"}</Heading>

			{status && (
			<StatusChip
				status={status}
				statusMapping={LOOKBOOK_STATUS_MAPPING}
				srOnlyPrefix="Status: "
				size="medium"
			/>
			)}

		</div>
	);
}

export default ComponentDocumentationHeading;
