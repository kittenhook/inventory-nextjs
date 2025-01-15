import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { LoaiGiong } from "@/lib/schema";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import TreeEditForm from "../forms/trees/treeEditForm";

type pageProps = {
	trees: LoaiGiong[];
};

export default function TreeTable(pageProps: pageProps) {
	return (
		<Table>
			{/* <TableCaption>A list of your recent invoices.</TableCaption> */}
			<TableHeader>
				<TableRow>
					<TableHead className='w-[320px]'>UUID</TableHead>
					<TableHead>Name</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{pageProps.trees.map((tree) => {
					return (
						<Dialog key={tree.maDinhDanh}>
							<DialogTrigger asChild>
								<TableRow>
									<TableCell>{tree.maDinhDanh}</TableCell>
									<TableCell>{tree.ten}</TableCell>
								</TableRow>
							</DialogTrigger>
							<DialogContent>
								<DialogTitle />
								<TreeEditForm tree={tree} />
							</DialogContent>
						</Dialog>
					);
				})}
			</TableBody>
		</Table>
	);
}
