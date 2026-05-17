import { ComponentCategory, ComponentName } from "../../constants";

import { ComponentManifest } from "../types";

import TableRow, { TableRowProps } from "./tableRow";

const TableRowComponent = ({ ...props }: TableRowProps) => (
	<table>
		<tbody>
			<TableRow {...props}>
				<td>Sample Cell 1</td>
				<td>Sample Cell 2</td>
			</TableRow>
		</tbody>
	</table>
);

const TableRowManifest: ComponentManifest<TableRowProps> = {
	category: ComponentCategory.DATA_DISPLAY,
	codeExamples: [
		{
			code: `<TableRow>\n  <TableBodyCell>Row Data 1</TableBodyCell>\n  <TableBodyCell>Row Data 2</TableBodyCell>\n</TableRow>`,
			title: "Standard Table Row"
		},
		{
			code: `<TableRow className="hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer">\n  <TableBodyCell>Interactive Row</TableBodyCell>\n</TableRow>`,
			title: "Interactive Hover Row"
		}
	],
	component: TableRowComponent,
	description: "A structural table row (tr) that organizes cells into a horizontal record. It defaults to top-alignment for multi-line content and includes pre-defined transition properties for hover effects.",
	name: ComponentName.TABLE_ROW,
	parameters: [
		{
			control: "none",
			description: "The table cells (TableBodyCell or TableHeadCell components) to be rendered within the row.",
			name: "children",
			required: true,
			type: "ReactNode"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for custom vertical alignment, hover backgrounds, or border colors.",
			name: "className",
			required: false,
			type: "string"
		}
	],
	status: "stable"
};

export default TableRowManifest;
