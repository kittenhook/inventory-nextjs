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
import {
	retrieveAllAnimalFactories,
	retrieveAnimal,
} from "@/lib/dbInteractions";
import Link from "next/link";

async function resolveAnimal(uuid: string | null) {
	if (!uuid) return "";
	const animal = await retrieveAnimal({ maDinhDanh: uuid });
	if (!animal) return "";
	return animal.ten;
}

export default async function UserPage() {
	const animalFactories = await retrieveAllAnimalFactories();
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
							<TableHead>Loai Dong Vat</TableHead>
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
						{animalFactories.map((user) => {
							return (
								<TableRow key={user.maDinhDanh}>
									<TableCell>{user.maDinhDanh}</TableCell>
									<TableCell>{user.ten}</TableCell>
									<TableCell>
										<Link
											href={`/database/loaiGiong/DongVat`}
										>
											{resolveAnimal(
												user.maDinhDanhLoaiDongVat
											)}
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
