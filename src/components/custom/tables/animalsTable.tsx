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

type pageProps = {
	animals: LoaiDongVat[];
	loaiBienDong: LoaiBienDong[];
	tinhTrangBaoTon: TinhTrangBaoTon[];
};

export default function AnimalTable(pageProps: pageProps) {
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

	return (
		<Table>
			{/* <TableCaption>A list of your recent invoices.</TableCaption> */}
			<TableHeader>
				<TableRow>
					<TableHead className='md:w-[320px] lg:w-[400px]'>
						UUID
					</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Moi truong song</TableHead>
					<TableHead>Vi tri phan bo</TableHead>
					<TableHead>Loai bien dong</TableHead>
					<TableHead>Tinh trang bao ton</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{pageProps.animals.map((animal) => {
					return (
						<Dialog key={animal.maDinhDanh}>
							<DialogTrigger asChild>
								<TableRow>
									<TableCell>{animal.maDinhDanh}</TableCell>
									<TableCell>{animal.ten}</TableCell>
									<TableCell>
										{animal.moiTruongSong}
									</TableCell>
									<TableCell>{animal.viTriPhanBo}</TableCell>
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
									TinhTrangBaoTon={pageProps.tinhTrangBaoTon}
								/>
							</DialogContent>
						</Dialog>
					);
				})}
			</TableBody>
		</Table>
	);
}
