"use client";

import { ReactNode } from "react";

import { Alert, ComponentManifest, Section, Typography } from "@otuekong-portfolio/curio";

import ComponentHeading from "./componentHeading";

interface DocumentationSectionProps {
	children?: ReactNode;
	className?: string;
	isManifestLoading: boolean;
	manifest: ComponentManifest | null;
	manifestError: Error | null;
	selectedComponent: string | null;
}

function DocumentationSection({
	children,
	className,
	isManifestLoading,
	manifest,
	manifestError,
	selectedComponent
}: DocumentationSectionProps) {
	if(!selectedComponent) {
		return (
			<Section className={className}>

				<Alert
					message="Select a component to view its documentation."
					severity="warning"
				/>

			</Section>
		);
	}

	if(manifestError) {
		return (
			<Section
				className={className}
				heading={
					<ComponentHeading
						name={selectedComponent}
					/>
				}>

				<Alert
					message={manifestError.message}
					severity="error"
				/>

			</Section>
		);
	}

	if(isManifestLoading) {
		return (
			<Section
				className={className}
				heading={
					<ComponentHeading
						name={selectedComponent}
					/>
				}>

				<Typography>Loading documentation...</Typography>

			</Section>
		);
	}

	if(!manifest) {
		return (
			<Section
				className={className}
				heading={
					<ComponentHeading
						name={selectedComponent}
					/>
				}>

				<Alert
					message={`No manifest found for component '${selectedComponent}'.`}
					severity="warning"
				/>

			</Section>
		);
	}

	return (
		<Section
			className={className}
			heading={
				<ComponentHeading
					name={selectedComponent}
					status={manifest.status}
				/>
			}
			subtitle={manifest.description}>

			{children}

		</Section>
	);
}

export default DocumentationSection;
