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

type pageProps = {
	users: User[];
	roles: Role[];
};

export default function UserTable(pageProps: pageProps) {
	function resolveRoleByUUID(uuid: string | null) {
		if (!uuid) return "";
		const role = pageProps.roles.find((role) => role.maDinhDanh == uuid);
		if (!role) return "";
		return role.ten;
	}
	return (
		<Table>
			{/* <TableCaption>A list of your recent invoices.</TableCaption> */}
			<TableHeader>
				<TableRow>
					<TableHead className='md:w-[320px] lg:w-[400px]'>
						UUID
					</TableHead>
					<TableHead>Name</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{pageProps.users.map((user) => {
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
								{/* <TreeEditForm tree={user} /> */}
							</DialogContent>
						</Dialog>
					);
				})}
			</TableBody>
		</Table>
	);
}
