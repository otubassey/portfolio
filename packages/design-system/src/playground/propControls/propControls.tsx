"use client";

import { Card } from "../../components";

import type { PropDefinition } from "../types";

interface PropControlsProps {
	propDefinitions: PropDefinition[];
	values: Record<string, any>;
	onChange: (name: string, value: any) => void;
}

function PropControls({ propDefinitions, values, onChange }: PropControlsProps) {
	return (
		<Card className="p-4">
			<h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
				Props
			</h3>
			<div className="space-y-4">
				{propDefinitions.map((prop) => (
				<div key={prop.name}>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
						{prop.name}
						{prop.description && (
							<span className="text-xs text-gray-500 ml-2">
							{prop.description}
							</span>
						)}
					</label>

					{prop.type === "string" && (
					<input
						type="text"
						value={values[prop.name] || ""}
						onChange={(e) => onChange(prop.name, e.target.value)}
						className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg
								bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
					/>
					)}

					{prop.type === "number" && (
					<input
						type="number"
						value={values[prop.name] || 0}
						onChange={(e) => onChange(prop.name, Number(e.target.value))}
						className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg
								bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
					/>
					)}

					{prop.type === "boolean" && (
					<label className="flex items-center space-x-2">
						<input
							type="checkbox"
							checked={values[prop.name] || false}
							onChange={(e) => onChange(prop.name, e.target.checked)}
							className="rounded"
						/>
						<span className="text-sm text-gray-600 dark:text-gray-400">
							{values[prop.name] ? "true" : "false"}
						</span>
					</label>
					)}

					{prop.type === "select" && prop.options && (
					<select
						value={values[prop.name]}
						onChange={(e) => onChange(prop.name, e.target.value)}
						className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg
								bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
					>
						{prop.options.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
						))}
					</select>
					)}

					{prop.type === "color" && (
					<input
						type="color"
						value={values[prop.name] || "#000000"}
						onChange={(e) => onChange(prop.name, e.target.value)}
						className="w-full h-10 rounded-lg"
					/>
					)}
				</div>
				))}
			</div>
		</Card>
	);
}

export default PropControls;
