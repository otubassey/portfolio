import { ComponentCategory, ComponentName } from "../../constants";

import { ComponentManifest } from "../types";

import TableBody, { TableBodyProps } from "./tableBody";

const TableBodyComponent = ({ ...props }: TableBodyProps) => (
	<table className="w-full border-collapse">
		<TableBody {...props}>
			<tr>
				<td className="p-2">Row 1, Cell 1</td>
				<td className="p-2">Row 1, Cell 2</td>
			</tr>
			<tr>
				<td className="p-2">Row 2, Cell 1</td>
				<td className="p-2">Row 2, Cell 2</td>
			</tr>
		</TableBody>
	</table>
);

const TableBodyManifest: ComponentManifest<TableBodyProps> = {
	category: ComponentCategory.DATA_DISPLAY,
	codeExamples: [
		{
			code: `<TableBody>\n  <TableRow>...</TableRow>\n  <TableRow>...</TableRow>\n</TableBody>`,
			title: "Standard Divided Body"
		},
		{
			code: `<Table>\n  <TableHead>\n    <TableRow>\n      <TableCell as="th">Name</TableCell>\n      <TableCell as="th">Email</TableCell>\n    </TableRow>\n  </TableHead>\n  <TableBody>\n    <TableRow>\n      <TableBodyCell>John Doe</TableBodyCell>\n      <TableBodyCell>john@example.com</TableBodyCell>\n    </TableRow>\n    <TableRow>\n      <TableBodyCell>Jane Smith</TableBodyCell>\n      <TableBodyCell>jane@example.com</TableBodyCell>\n    </TableRow>\n  </TableBody>\n</Table>`,
			title: "Basic Table Body"
		},
		{
			code: `<TableBody>\n  {users.map((user) => (\n    <TableRow key={user.id}>\n      <TableBodyCell>{user.name}</TableBodyCell>\n      <TableBodyCell>{user.role}</TableBodyCell>\n      <TableBodyCell>{user.status}</TableBodyCell>\n    </TableRow>\n  ))}\n</TableBody>`,
			title: "Dynamic Rows"
		}
	],
	component: TableBodyComponent,
	description: "A table body section component that wraps table data rows with automatic divider lines between rows for visual separation.",
	name: ComponentName.TABLE_BODY,
	parameters: [
		{
			control: "none",
			description: "The table data rows (typically TableRow components containing TableBodyCell elements) to be rendered within the body section.",
			name: "children",
			required: true,
			type: "ReactNode"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for custom background colors or border overrides.",
			name: "className",
			required: false,
			type: "string"
		}
	],
	status: "stable"
};

export default TableBodyManifest;
