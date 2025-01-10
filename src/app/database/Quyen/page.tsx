import Navbar from "@/components/custom/Navbar";
import { retrieveAllUserRoles, retrieveAllUsers } from "@/lib/userInteractions";
import * as React from "react";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export default async function UserPage() {
	const roles = await retrieveAllUserRoles();
	return (
		<div className='mx-[100px]'>
			<Navbar></Navbar>
			<div>
				<Table>
					<TableCaption>A list of your roles.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[300px]'>UUID</TableHead>
							<TableHead>Ten</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{/* <TableRow>
							<TableCell className='font-medium'>
								INV001
							</TableCell>
							<TableCell>Paid</TableCell>
							<TableCell>Credit Card</TableCell>
							<TableCell className='text-right'>.00</TableCell>
						</TableRow> */}
						{roles.map((role) => {
							return (
								<TableRow key={role.maDinhDanh}>
									<TableCell>{role.maDinhDanh}</TableCell>
									<TableCell>{role.ten}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
