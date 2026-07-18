import { HostedAppManifest, HostedAppManifestSummary } from "./types";

const AppManifestUtils = Object.freeze({
	areEqual: (
		a: HostedAppManifestSummary | null,
		b: HostedAppManifestSummary | null
	): boolean => {
		if(a === null && b === null) return true;
		if(a === null || b === null) return false;
		return (
			a.family === b.family &&
			a.name === b.name &&
			a.label === b.label
		);
	},
	matches: (
		summary: HostedAppManifestSummary | null,
		target: HostedAppManifestSummary | null
	): boolean => {
		if(summary === null && target === null) return true;
		if(summary === null || target === null) return false;
		return (
			summary.family === target.family &&
			summary.name === target.name &&
			summary.label === target.label
		);
	},
	toSummary: ({family, name, label}: HostedAppManifest): HostedAppManifestSummary => {
		return ({ family, name, label });
	}
} as const);

export default AppManifestUtils;
