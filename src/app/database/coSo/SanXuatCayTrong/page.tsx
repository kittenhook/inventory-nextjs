import Navbar from "@/components/custom/Navbar";
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
import { retrieveAllTreeFactories } from "@/lib/dbInteractions";

export default async function UserPage() {
	const treeFactories = await retrieveAllTreeFactories();
	return (
		<div className='mx-[100px]'>
			<Navbar></Navbar>
			<div>
				<Table>
					<TableCaption>A list of your factories.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[300px]'>UUID</TableHead>
							<TableHead>Ten</TableHead>
							<TableHead></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{treeFactories.map((factory) => {
							return (
								<TableRow key={factory.maDinhDanh}>
									<TableCell>{factory.maDinhDanh}</TableCell>
									<TableCell>{factory.ten}</TableCell>
									<TableCell>{factory.congSuat}</TableCell>
									<TableCell>
										{factory.maDinhDanhLoaiGiong}
									</TableCell>
									<TableCell>
										{factory.maDinhDanhNguoiPhuTrach}
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
