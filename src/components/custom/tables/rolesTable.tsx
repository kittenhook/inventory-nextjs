import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Role } from "@/lib/schema";

import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import RoleEditForm from "../forms/roles/roleEditForm";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

type pageProps = {
	roles: Role[];
};

export default function RoleTable(pageProps: pageProps) {
	const [filteredTable, setFilteredTable] = useState<Role[]>(pageProps.roles);
	const [searchTerm, setSearchTerm] = useState("");
	useEffect(() => {
		if (searchTerm == "") {
			setFilteredTable(pageProps.roles);
			return;
		}
		setFilteredTable(
			pageProps.roles.filter((role) =>
				role.ten.toLowerCase().includes(searchTerm.toLowerCase())
			)
		);
	}, [searchTerm, pageProps.roles]);
	return (
		<div>
			<Input onChange={(e) => setSearchTerm(e.target.value)} />
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='md:w-[320px] lg:w-[400px]'>
							UUID
						</TableHead>
						<TableHead>Tên</TableHead>
						<TableHead>Có khả năng thay đổi website?</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredTable.map((role) => {
						return (
							<Dialog key={role.maDinhDanh}>
								<DialogTrigger asChild>
									<TableRow>
										<TableCell>{role.maDinhDanh}</TableCell>
										<TableCell>{role.ten}</TableCell>
										<TableCell>
											{role.isPrivileged ? (
												<Checkbox disabled checked />
											) : (
												<Checkbox disabled />
											)}
										</TableCell>
									</TableRow>
								</DialogTrigger>
								<DialogContent>
									<DialogTitle />
									<RoleEditForm role={role} />
								</DialogContent>
							</Dialog>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
}
