import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Role, User } from "@/lib/schema";

import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import UserEditForm from "../forms/users/userEditForm";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

type pageProps = {
	users: User[];
	roles: Role[];
};

export default function UserTable(pageProps: pageProps) {
	const [filteredTable, setFilteredTable] = useState<User[]>(pageProps.users);
	const [searchTerm, setSearchTerm] = useState("");
	useEffect(() => {
		if (searchTerm == "") {
			setFilteredTable(pageProps.users);
			return;
		}
		setFilteredTable(
			pageProps.users.filter(
				(user) =>
					user.ten.toLowerCase().includes(searchTerm.toLowerCase()) ||
					user.email
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					resolveRoleByUUID(user.maDinhDanhQuyen)
						.toLowerCase()
						.includes(searchTerm.toLowerCase())
			)
		);
	}, [searchTerm, pageProps.users]);
	function resolveRoleByUUID(uuid: string | null) {
		if (!uuid) return "";
		const role = pageProps.roles.find((role) => role.maDinhDanh == uuid);
		if (!role) return "";
		return role.ten;
	}
	return (
		<div>
			<Input
				placeholder=''
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='md:w-[320px] lg:w-[400px]'>
							ID
						</TableHead>
						<TableHead>Tên</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Quyền</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredTable.map((user) => {
						return (
							<Dialog key={user.maDinhDanh}>
								<DialogTrigger asChild>
									<TableRow>
										<TableCell>{user.maDinhDanh}</TableCell>
										<TableCell>{user.ten}</TableCell>
										<TableCell>{user.email}</TableCell>
										<TableCell>
											{resolveRoleByUUID(
												user.maDinhDanhQuyen
											)}
										</TableCell>
									</TableRow>
								</DialogTrigger>
								<DialogContent>
									<DialogTitle />
									<UserEditForm
										user={user}
										roles={pageProps.roles}
									/>
								</DialogContent>
							</Dialog>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
}
