import { AppManifest, AppManifestSummary } from "./types";

const AppManifestUtils = {
	areEqual: (a: AppManifestSummary, b: AppManifestSummary): boolean => {
		return (
			a.family === b.family &&
			a.name === b.name &&
			a.label === b.label
		);
	},
	matches: (summary: AppManifestSummary, target: AppManifestSummary | AppManifest): boolean => {
		return (
			summary.family === target.family &&
			summary.name === target.name &&
			summary.label === target.label
		);
	},
	toSummary: ({family, name, label}: AppManifest): AppManifestSummary => {
		return ({ family, name, label });
	}
} as const;

export default AppManifestUtils;
