"use client";

import { ReactNode } from "react";

import { Alert, ComponentManifest, Section, Typography } from "@otuekong-portfolio/design-system";

interface ComponentDocumentationLayoutProps {
	children?: ReactNode;
	className?: string;
	description?: string;
	heading: ReactNode;
	isLoadingManifest: boolean;
	manifest: ComponentManifest | null;
	manifestError: Error | null;
	selectedComponent: string | null;
}

function ComponentDocumentationLayout({
	children,
	className,
	description,
	heading,
	isLoadingManifest,
	manifest,
	manifestError,
	selectedComponent
}: ComponentDocumentationLayoutProps) {
	if(isLoadingManifest) {
		return (
			<Section
				className={className}
				subtitle={description}
				heading={heading}>

				<Typography>Loading documentation...</Typography>

			</Section>
		);
	}

	if(manifestError) {
		return (
			<Section
				className={className}
				subtitle={description}
				heading={heading}>

				<Alert
					message={manifestError.message}
					severity="error"
				/>

			</Section>
		);
	}

	if(!selectedComponent) {
		return (
			<Section
				className={className}
				subtitle={description}
				heading={heading}>

				<Alert
					message="Select a component to view its documentation."
					severity="warning"
				/>

			</Section>
		);
	}

	if(!manifest) {
		return (
			<Section
				className={className}
				subtitle={description}
				heading={heading}>

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
			subtitle={description}
			heading={heading}>

			{children}

		</Section>
	);
}

export default ComponentDocumentationLayout;
