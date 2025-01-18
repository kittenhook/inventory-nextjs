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

type pageProps = {
	roles: Role[];
};

export default function RoleTable(pageProps: pageProps) {
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
				{pageProps.roles.map((role) => {
					return (
						<Dialog key={role.maDinhDanh}>
							<DialogTrigger asChild>
								<TableRow>
									<TableCell>{role.maDinhDanh}</TableCell>
									<TableCell>{role.ten}</TableCell>
								</TableRow>
							</DialogTrigger>
							<DialogContent>
								<DialogTitle />
								{/* <TreeEditForm tree={role} /> */}
							</DialogContent>
						</Dialog>
					);
				})}
			</TableBody>
		</Table>
	);
}
