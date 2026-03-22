import { ComponentCategory, ComponentName } from "../../constants";

import { ComponentManifest } from "../types";

import Table, { TableProps } from "./table";

const TableComponent = ({ ...props }: TableProps) => (
	<Table {...props}>
		<thead>
			<tr>
				<th className="p-4 bg-gray-50 dark:bg-gray-800">Name</th>
				<th className="p-4 bg-gray-50 dark:bg-gray-800">Email</th>
				<th className="p-4 bg-gray-50 dark:bg-gray-800">Role</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td className="p-4 border-t">John Doe</td>
				<td className="p-4 border-t">john@example.com</td>
				<td className="p-4 border-t">Admin</td>
			</tr>
			<tr>
				<td className="p-4 border-t">Jane Smith</td>
				<td className="p-4 border-t">jane@example.com</td>
				<td className="p-4 border-t">User</td>
			</tr>
		</tbody>
	</Table>
);

const TableManifest: ComponentManifest<TableProps> = {
	category: ComponentCategory.DATA_DISPLAY,
	codeExamples: [
		{
			code: `<Table>\n  <TableHead>\n    <TableRow>\n      <TableCell as="th">Product</TableCell>\n      <TableCell as="th">Price</TableCell>\n      <TableCell as="th">Stock</TableCell>\n    </TableRow>\n  </TableHead>\n  <TableBody>\n    <TableRow>\n      <TableBodyCell>Laptop</TableBodyCell>\n      <TableBodyCell>$999</TableBodyCell>\n      <TableBodyCell>In Stock</TableBodyCell>\n    </TableRow>\n    <TableRow>\n      <TableBodyCell>Mouse</TableBodyCell>\n      <TableBodyCell>$29</TableBodyCell>\n      <TableBodyCell>Low Stock</TableBodyCell>\n    </TableRow>\n  </TableBody>\n</Table>`,
			title: "Complete Table"
		},
		{
			code: `<Table className="text-sm">\n  <TableHead>\n    <TableRow>\n      <TableCell as="th">ID</TableCell>\n      <TableCell as="th">Status</TableCell>\n      <TableCell as="th">Date</TableCell>\n    </TableRow>\n  </TableHead>\n  <TableBody>\n    {orders.map((order) => (\n      <TableRow key={order.id}>\n        <TableBodyCell mono>{order.id}</TableBodyCell>\n        <TableBodyCell color={order.statusColor}>\n          {order.status}\n        </TableBodyCell>\n        <TableBodyCell>{order.date}</TableBodyCell>\n      </TableRow>\n    ))}\n  </TableBody>\n</Table>`,
			title: "Table with Dynamic Data"
		}
	],
	component: TableComponent,
	description: "A wrapper for standard HTML tables that provides a responsive overflow container and consistent border styling for data-heavy views.",
	name: ComponentName.TABLE,
	parameters: [
		{
			control: "none",
			description: "The table sections (TableHead, TableBody, TableFooter) and rows to be rendered within the table.",
			name: "children",
			required: true,
			type: "ReactNode"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for custom cell padding or text alignment overrides.",
			name: "className",
			required: false,
			type: "string"
		}
	],
	status: "stable"
};

export default TableManifest;
