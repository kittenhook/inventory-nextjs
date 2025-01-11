import Navbar from "@/components/custom/Navbar";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { retrieveAllTrees } from "@/lib/dbInteractions";

export default async function Cay() {
	const responseData = await retrieveAllTrees();

	return (
		<div className='mx-[100px] flex flex-col gap-7'>
			<Navbar></Navbar>
			<div className='flex flex-row justify-end w-fill'>
				<Button asChild>
					<Link href={`/database/loaiGiong/Cay/new`}>
						Add a record
					</Link>
				</Button>
			</div>
			<div className='flex flex-row gap-3'>
				<Table>
					<TableCaption>Tat Ca Loai Cay</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className='font-bold'>ID</TableHead>
							<TableHead>Ten</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{responseData.map((row) => {
							return (
								<TableRow key={row.maDinhDanh}>
									<TableCell>{row.maDinhDanh}</TableCell>
									<TableCell>{row.ten}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
