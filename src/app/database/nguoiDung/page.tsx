import Navbar from "@/components/custom/Navbar";
import { retrieveAllUsers, retrieveUserRole } from "@/lib/userInteractions";
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
import Link from "next/link";

async function resolveRole(uuid: string | null) {
	if (!uuid) return "";
	const role = await retrieveUserRole({ uuid: uuid });
	if (!role) return "";
	return role.ten;
}

export default async function UserPage() {
	const users = await retrieveAllUsers();
	return (
		<div className='mx-[100px]'>
			<Navbar></Navbar>
			<div>
				<Table>
					<TableCaption>A list of your users.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[300px]'>UUID</TableHead>
							<TableHead>Ten</TableHead>
							<TableHead>Email</TableHead>
							<TableHead className='text-right'>Role</TableHead>
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
						{users.map((user) => {
							return (
								<TableRow key={user.maDinhDanh}>
									<TableCell>
										<Link
											href={`/database/nguoiDung/${user.maDinhDanh}`}
										>
											{user.maDinhDanh}
										</Link>
									</TableCell>
									<TableCell>{user.ten}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell className='text-right'>
										<Link href={`/database/Quyen`}>
											{resolveRole(user.maDinhDanhQuyen)}
										</Link>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
