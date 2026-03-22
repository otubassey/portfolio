"use client";

import { useMemo } from "react";

import {
	Alert,
	ComponentManifest,
	Playground,
	PlaygroundControl,
	PlaygroundControls,
	PlaygroundPreview,
	Section
} from "@otuekong-portfolio/design-system";

interface ComponentPlaygroundProps {
	className?: string;
	manifest?: ComponentManifest | null;
}

function ComponentPlayground({
	className,
	manifest
}: ComponentPlaygroundProps) {
	const { controls, hasVisibleControls } = useMemo(() => {
		if(!manifest?.parameters?.length) {
			return { controls: [], hasVisibleControls: false };
		}

		const controls = manifest.parameters.map(parameter => {
			const param = typeof parameter === "function"
				? parameter({})
				: parameter;

			return {
				parameter,
				parameterKey: param.name,
				isConfigurable: param.control !== "none" && param.control !== "readonly"
			};
		});

		return {
			controls: controls,
			hasVisibleControls: controls.some(control => control.isConfigurable)
		};
	}, [manifest]);
	return (
		<Section
			className={className}
			heading="Interactive Playground">

			<Playground manifest={manifest}>

				<PlaygroundPreview
					component={manifest?.component}
				/>

				<PlaygroundControls>

					{hasVisibleControls
					? (
						controls.map(({ parameter, parameterKey }) => (
							<PlaygroundControl
								key={parameterKey}
								parameter={parameter}
							/>
						))
					)
					: (// TODO: Fix message cutting out without elipsis
						<Alert
							message="This component has no interactive controls. Check the API documentation for available props."
							severity="info"
						/>
					)}

				</PlaygroundControls>

			</Playground>

		</Section>
	);
}

export default ComponentPlayground;
