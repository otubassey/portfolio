import { ComponentCategory, ComponentName } from "../../constants";
import { ManifestUtils } from "../../utils";

import { ComponentManifest } from "../types";

import TableBodyCell, { COLOR_STYLES, TableBodyCellProps } from "./tableBodyCell";

const TableBodyCellComponent = ({ ...props }: TableBodyCellProps) => (
	<table className="w-full border-collapse">
		<tbody>
			<tr>
				<TableBodyCell {...props}>Sample cell content</TableBodyCell>
				<TableBodyCell>Another cell without props</TableBodyCell>
			</tr>
		</tbody>
	</table>
);

const TableBodyCellManifest: ComponentManifest<TableBodyCellProps> = {
	category: ComponentCategory.DATA_DISPLAY,
	codeExamples: [
		{
			code: `<Table>\n  <TableBody>\n    <TableRow>\n      <TableBodyCell>John Doe</TableBodyCell>\n      <TableBodyCell>john@example.com</TableBodyCell>\n      <TableBodyCell>Active</TableBodyCell>\n    </TableRow>\n  </TableBody>\n</Table>`,
			title: "Basic Table Body Cell"
		},
		{
			code: `<TableBodyCell color="success">Completed</TableBodyCell>\n<TableBodyCell color="error">Failed</TableBodyCell>\n<TableBodyCell color="warning">Pending</TableBodyCell>`,
			title: "Colored Cells"
		},
		{
			code: `<TableBodyCell mono>ABC-123-XYZ</TableBodyCell>\n<TableBodyCell mono>192.168.1.1</TableBodyCell>`,
			title: "Monospace Content"
		}
	],
	component: TableBodyCellComponent,
	description: "A standard table data cell (td) designed for body rows. Provides consistent internal padding, responsive font scaling, and support for monospace formatting.",
	name: ComponentName.TABLE_BODY_CELL,
	parameters: [
		{
			control: "none",
			description: "The content (text, chips, or custom components) to be rendered within the cell.",
			name: "children",
			required: true,
			type: "ReactNode"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for custom cell alignment, width, or white-space handling.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "select",
			defaultValue: "default",
			description: "The theme color applied to the text content, mapping to Typography color tokens.",
			name: "color",
			options: Object.keys(COLOR_STYLES),
			required: false,
			type: ManifestUtils.getEnumParameterType(Object.keys(COLOR_STYLES))
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, applies a monospace font family. Recommended for IDs, codes, and numerical data.",
			name: "mono",
			required: false,
			type: "boolean"
		}
	],
	status: "stable"
};

export default TableBodyCellManifest;
