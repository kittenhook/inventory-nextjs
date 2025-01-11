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

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { retrieveAllDistricts } from "@/lib/dbInteractions";

export default async function UserPage() {
	const districts = await retrieveAllDistricts();
	return (
		<div className='mx-[100px]'>
			<Navbar></Navbar>
			<div>
				<div className='flex flex-row justify-end w-fill'>
					<Button asChild>
						<Link href='/database/Quan/new'>Add a record</Link>
					</Button>
				</div>
				<Table>
					<TableCaption>A list of your districts.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[300px]'>UUID</TableHead>
							<TableHead>Ten</TableHead>
							<TableHead>Truc thuoc Thanh Pho</TableHead>
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
						{districts.map((district) => {
							return (
								<TableRow key={district.maDinhDanh}>
									<TableCell>{district.maDinhDanh}</TableCell>
									<TableCell>{district.ten}</TableCell>
									<TableCell>
										{district.maDinhDanhThanhPho}
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
