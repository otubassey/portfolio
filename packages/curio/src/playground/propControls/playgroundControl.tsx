"use client";

import {
	Alert,
	ComponentParameter,
	ComponentParameterFactory,
	Label,
	Select,
	SelectOption,
	Switch,
	Typography
} from "../../components";

import { usePlayground } from "../context";

interface PlaygroundControlProps {
	parameter: ComponentParameter | ComponentParameterFactory;
	onChange?: (newValue: any) => void;
}

const PlaygroundControl = ({
	parameter: parameterProp,
	onChange
}: PlaygroundControlProps) => {
	const {controlProps: props, onPropsChange} = usePlayground();

	const parameter = typeof parameterProp === "function" ? parameterProp(props) : parameterProp;

	const handleSelectChange = (value: string) => {
		onChange?.(value);
		onPropsChange(parameter.name, value);
	};

	if(parameter.control === "none") {
		return null;
	}

	if(parameter.control === "readonly") {
		return (
			<div className="flex flex-col gap-1.5">
				<Label>{parameter.name}</Label>
				<Typography
					className="p-2 bg-gray-100 dark:bg-gray-800 rounded"
					color="muted"
					variant="body2">
					{props[parameter.name] || "N/A"}
				</Typography>
			</div>
		);
	}

	if(parameter.control === "switch") {
		return (
			<div className="flex flex-col gap-1.5">
				<Switch
					checked={props[parameter.name]}
					uncheckedLabel={parameter.name}
					onChange={(checked) => {
						onChange?.(checked);
						onPropsChange(parameter.name, checked);
					}}
					required={parameter.required}
				/>
			</div>
		);
	}

	if(parameter.control === "select") {
		let selectOptions = parameter.options ?? [];
		// If options are simple strings, convert them to { label, value } format
		if(selectOptions.length > 0 && typeof selectOptions[0] === "string") {
			selectOptions = (selectOptions as Array<string>).map(option => ({
				label: option,
				value: option
			}));
		}
		return (
			<Select
				fullWidth
				label={parameter.name}
				onChange={handleSelectChange}
				options={selectOptions as ReadonlyArray<SelectOption>}
				required={parameter.required}
				value={props[parameter.name]}
			/>
		);
	}

	return (
		<Alert
			message={`Unsupported control type: "${parameter.control}" for prop "${parameter.name}".`}
			severity="warning"
		/>
	);
};

PlaygroundControl.displayName = "PlaygroundControl";

export default PlaygroundControl;
