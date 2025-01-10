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
import { retrieveAllAnimals } from "@/lib/dbInteractions";

export default async function DongVat() {
	const animals = await retrieveAllAnimals();
	return (
		<div className='mx-[100px] flex flex-col gap-7'>
			<div>
				<Navbar></Navbar>
			</div>
			<div className='flex flex-row justify-end w-fill'>
				<Button asChild>
					<Link href={`/database/loaiGiong/DongVat/new`}>
						Add a record
					</Link>
				</Button>
			</div>
			<div className='flex flex-row gap-3'>
				{/* <div>
					<Card>
						<CardHeader>
							<CardTitle>Card Title</CardTitle>
							<CardDescription>Card Description</CardDescription>
						</CardHeader>
						<CardContent>
							<p>Card Content</p>
						</CardContent>
						<CardFooter>
							<p>Card Footer</p>
						</CardFooter>
					</Card>
				</div> */}
				<Table>
					<TableCaption>Tat Ca Loai Dong Vat</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>UUID</TableHead>
							<TableHead>Ten</TableHead>
							<TableHead>Moi Truong Song</TableHead>
							<TableHead>Vi tri phan bo</TableHead>
							<TableHead>Loai Bien Dong</TableHead>
							<TableHead>Tinh Trang Bao Ton</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{animals.map((row) => {
							return (
								<TableRow key={row.maDinhDanh}>
									<TableCell>{row.maDinhDanh}</TableCell>
									<TableCell>{row.ten}</TableCell>
									<TableCell>{row.moiTruongSong}</TableCell>
									<TableCell>{row.viTriPhanBo}</TableCell>
									<TableCell>
										{row.maDinhDanhLoaiBienDong}
									</TableCell>
									<TableCell>
										{row.maDinhDanhTinhTrangBaoTon}
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
