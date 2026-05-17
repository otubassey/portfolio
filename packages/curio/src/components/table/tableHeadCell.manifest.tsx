import { ComponentCategory, ComponentName } from "../../constants";

import { ComponentManifest } from "../types";

import TableHeadCell, { TableHeadCellProps } from "./tableHeadCell";

const TableHeadCellComponent = ({ ...props }: TableHeadCellProps) => (
	<table>
		<thead>
			<tr>
				<TableHeadCell {...props}>
					Sample Cell 1
				</TableHeadCell>
			</tr>
		</thead>
	</table>
);

const TableHeadCellManifest: ComponentManifest<TableHeadCellProps> = {
	category: ComponentCategory.DATA_DISPLAY,
	codeExamples: [
		{
			code: `<TableHeadCell>Date Created</TableHeadCell>`,
			title: "Standard Column Header"
		},
		{
			code: `<TableHeadCell className="text-right">Actions</TableHeadCell>`,
			title: "Right-Aligned Header"
		}
	],
	component: TableHeadCellComponent,
	description: "A semantic table header cell (th) designed for thead rows. Automatically applies uppercase typography and increased letter spacing to distinguish column labels from data.",
	name: ComponentName.TABLE_HEAD_CELL,
	parameters: [
		{
			control: "none",
			description: "The column label or React elements to be rendered within the header cell.",
			name: "children",
			required: true,
			type: "ReactNode",
			value: "Date Created"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for custom text alignment, width constraints, or padding overrides.",
			name: "className",
			required: false,
			type: "string"
		}
	],
	status: "stable"
};

export default TableHeadCellManifest;

