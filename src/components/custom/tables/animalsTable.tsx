import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { LoaiBienDong, LoaiDongVat, TinhTrangBaoTon } from "@/lib/schema";

import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import AnimalEditForm from "@/components/custom/forms/animals/animalEditForm";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

type pageProps = {
	animals: LoaiDongVat[];
	loaiBienDong: LoaiBienDong[];
	tinhTrangBaoTon: TinhTrangBaoTon[];
};

export default function AnimalTable(pageProps: pageProps) {
	const [filteredTable, setFilteredTable] = useState<LoaiDongVat[]>(
		pageProps.animals
	);
	const [searchTerm, setSearchTerm] = useState("");

	function resolveTTBTByUUID(uuid: string | null) {
		if (!uuid) return "";
		const ttbt = pageProps.tinhTrangBaoTon.find(
			(ttbt) => ttbt.maDinhDanh == uuid
		);
		if (!ttbt) return "";
		return ttbt.ten;
	}
	function resolveLBDByUUID(uuid: string | null) {
		if (!uuid) return "";
		const lbd = pageProps.loaiBienDong.find(
			(lbd) => lbd.maDinhDanh == uuid
		);
		if (!lbd) return "";
		return lbd.ten;
	}
	useEffect(() => {
		if (searchTerm == "") {
			setFilteredTable(pageProps.animals);
			return;
		}
		setFilteredTable(
			pageProps.animals.filter(
				(item) =>
					item.ten.toLowerCase().includes(searchTerm.toLowerCase()) ||
					item.moiTruongSong
						?.toLowerCase()
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					item.viTriPhanBo
						?.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					resolveLBDByUUID(item.maDinhDanhLoaiBienDong)
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					resolveTTBTByUUID(item.maDinhDanhTinhTrangBaoTon)
						.toLowerCase()
						.includes(searchTerm.toLowerCase())
			)
		);
	}, [searchTerm, pageProps.animals]);
	return (
		<>
			<Input
				placeholder='Search Bar'
				onChange={(e) => setSearchTerm(e.target.value)}
				defaultValue=''
			/>
			<Table>
				{/* <TableCaption>A list of your recent invoices.</TableCaption> */}
				<TableHeader>
					<TableRow>
						<TableHead className='md:w-[320px] lg:w-[400px]'>
							UUID
						</TableHead>
						<TableHead>Tên</TableHead>
						<TableHead>Môi trường sống</TableHead>
						<TableHead>Vị trí phân bổ</TableHead>
						<TableHead>Loại biến động</TableHead>
						<TableHead>Tình trạng bảo tồn</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredTable.map((animal) => {
						return (
							<Dialog key={animal.maDinhDanh}>
								<DialogTrigger asChild>
									<TableRow>
										<TableCell>
											{animal.maDinhDanh}
										</TableCell>
										<TableCell>{animal.ten}</TableCell>
										<TableCell>
											{animal.moiTruongSong}
										</TableCell>
										<TableCell>
											{animal.viTriPhanBo}
										</TableCell>
										<TableCell>
											{resolveLBDByUUID(
												animal.maDinhDanhLoaiBienDong
											)}
										</TableCell>
										<TableCell>
											{resolveTTBTByUUID(
												animal.maDinhDanhTinhTrangBaoTon
											)}
										</TableCell>
									</TableRow>
								</DialogTrigger>
								<DialogContent>
									<DialogTitle />
									<AnimalEditForm
										animal={animal}
										loaiBienDong={pageProps.loaiBienDong}
										TinhTrangBaoTon={
											pageProps.tinhTrangBaoTon
										}
									/>
								</DialogContent>
							</Dialog>
						);
					})}
				</TableBody>
			</Table>
		</>
	);
}
