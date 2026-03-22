"use client";

import {
	ComponentManifest,
	LinkButton,
	Section,
	Table,
	TableBody,
	TableBodyCell,
	TableHead,
	TableHeadCell,
	TableRow,
	Typography
} from "@otuekong-portfolio/design-system";

function mapDefaultValue(value: any): string {
	if(value === undefined) {
		return "-";
	}
	if(typeof value === "string") {
		return `'${value}'`;
	}
	if(typeof value === "boolean" || typeof value === "number") {
		return String(value);
	}
	if(Array.isArray(value)) {
		return `[${value.map(mapDefaultValue).join(", ")}]`;
	}
	if(typeof value === "object" && value !== null) {
		return JSON.stringify(value);
	}
	return String(value);
}

interface SubtitleProps {
	extendList: Array<string> | undefined;
	onLinkClick: (componentName: string) => void;
}

function Subtitle({
	extendList,
	onLinkClick
}: SubtitleProps) {
	if(!extendList || extendList.length === 0) {
		return "Props of the native component are also available.";
	}
	return (
		<Typography
			className="max-w-3xl"
			color="muted"
			variant="body1">
			Props of the

			{extendList.map(componentName => (
			<LinkButton
				key={componentName}
				className="m-0.5"
				onClick={() => onLinkClick(componentName)}>
				{componentName}
			</LinkButton>
			))}

			component{extendList.length > 1 ? "s" : ""} are also available.
		</Typography>
	);
}

interface ComponentDocumentationApiProps {
	manifest: ComponentManifest<any>;
	onExtendedComponentClick: (component: string) => void;
	className?: string;
}

function ComponentDocumentationApi({
	manifest,
	onExtendedComponentClick,
	className
}: ComponentDocumentationApiProps) {
	const componentParameters = Array.isArray(manifest.parameters) ? manifest.parameters : [];
	return (
		<Section
			className={className}
			heading="Props"
			subtitle={
				<Subtitle
					extendList={manifest.extends}
					onLinkClick={onExtendedComponentClick}
				/>
			}>
			<Table>
				<TableHead>
					<TableRow>
						<TableHeadCell>Name</TableHeadCell>
						<TableHeadCell>Type</TableHeadCell>
						<TableHeadCell>Default</TableHeadCell>
						<TableHeadCell>Description</TableHeadCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{componentParameters.map(componentParameter => {
						const parameter = typeof componentParameter === "function"
							? componentParameter({})
							: componentParameter;
						return (
							<TableRow key={parameter.name}>
								<TableBodyCell mono color="primary" className="font-bold">
									{parameter.name}{parameter.required && (
									<>
										<span
											aria-hidden="true"
											className="text-red-500 ml-1"
											title="Required">
											*
										</span>
										<span className="sr-only">(required)</span>
									</>
									)}
								</TableBodyCell>
								<TableBodyCell mono color="muted" className="text-xs italic">
									{parameter.type}
								</TableBodyCell>
								<TableBodyCell mono color="muted">
									{mapDefaultValue(parameter.defaultValue)}
								</TableBodyCell>
								<TableBodyCell color="muted">
									{parameter.description}
								</TableBodyCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</Section>
	);
}

export default ComponentDocumentationApi;
