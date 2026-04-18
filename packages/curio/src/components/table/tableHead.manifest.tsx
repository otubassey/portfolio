import { ComponentCategory, ComponentName } from "../../constants";

import { ComponentManifest } from "../types";

import TableHead, { TableHeadProps } from "./tableHead";

const TableHeadComponent = ({ ...props }: TableHeadProps) => (
	<table className="w-full border-collapse">
		<TableHead {...props}>
			<tr>
				<th className="p-2 text-left">Name</th>
				<th className="p-2 text-left">Email</th>
				<th className="p-2 text-left">Role</th>
			</tr>
		</TableHead>
	</table>
);

const TableHeadManifest: ComponentManifest<TableHeadProps> = {
	category: ComponentCategory.DATA_DISPLAY,
	codeExamples: [
		{
			code: `<Table>\n  <TableHead>\n    <TableRow>\n      <TableCell as="th">Name</TableCell>\n      <TableCell as="th">Email</TableCell>\n      <TableCell as="th">Status</TableCell>\n    </TableRow>\n  </TableHead>\n  <TableBody>\n    {/* rows */}\n  </TableBody>\n</Table>`,
			title: "Basic Table Header"
		},
		{
			code: `<Table>\n  <TableHead className="sticky top-0 z-10">\n    <TableRow>\n      <TableCell as="th">Product</TableCell>\n      <TableCell as="th">Price</TableCell>\n      <TableCell as="th">Stock</TableCell>\n    </TableRow>\n  </TableHead>\n  <TableBody>\n    {/* rows */}\n  </TableBody>\n</Table>`,
			title: "Sticky Header"
		}
	],
	component: TableHeadComponent,
	description: "A table header section component that wraps table header rows with consistent background styling and border separation.",
	name: ComponentName.TABLE_HEAD,
	parameters: [
		{
			control: "none",
			description: "The table header rows (typically TableRow components containing th elements) to be rendered within the header section.",
			name: "children",
			required: true,
			type: "ReactNode"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for custom background colors or border adjustments.",
			name: "className",
			required: false,
			type: "string"
		}
	],
	status: "stable"
};

export default TableHeadManifest;
