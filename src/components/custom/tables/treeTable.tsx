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
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import TreeEditForm from "../forms/trees/treeEditForm";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

type pageProps = {
	trees: LoaiGiong[];
};

export default function TreeTable(pageProps: pageProps) {
	const [filteredTable, setFilteredTable] = useState<LoaiGiong[]>(
		pageProps.trees
	);
	const [searchTerm, setSearchTerm] = useState("");
	useEffect(() => {
		if (searchTerm == "") {
			setFilteredTable(pageProps.trees);
			return;
		}
		setFilteredTable(
			pageProps.trees.filter(
				(tree) =>
					tree.ten.toLowerCase().includes(searchTerm.toLowerCase()) ||
					tree.moiTruong
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					tree.tacDongMoiTruong
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					tree.nangSuat
						.toString()
						.toLowerCase()
						.includes(searchTerm.toLowerCase())
			)
		);
	}, [searchTerm, pageProps.trees]);
	return (
		<div>
			<Input
				placeholder='Search bar'
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<Table>
				{/* <TableCaption>A list of your recent invoices.</TableCaption> */}
				<TableHeader>
					<TableRow>
						<TableHead className='md:w-[320px] lg:w-[400px]'>
							UUID
						</TableHead>
						<TableHead>Tên</TableHead>
						<TableHead>Môi trường</TableHead>
						<TableHead>Năng suất</TableHead>
						<TableHead>Tác động môi trường</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredTable.map((tree) => {
						return (
							<Dialog key={tree.maDinhDanh}>
								<DialogTrigger asChild>
									<TableRow>
										<TableCell>{tree.maDinhDanh}</TableCell>
										<TableCell>{tree.ten}</TableCell>
										<TableCell>{tree.moiTruong}</TableCell>
										<TableCell>
											{tree.nangSuat} kg/m^2
										</TableCell>
										<TableCell>
											{tree.tacDongMoiTruong}
										</TableCell>
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
		</div>
	);
}
