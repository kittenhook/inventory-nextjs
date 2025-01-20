import {
	CoSoLuuTruDongVat,
	CoSoSanXuatCay,
	HinhThucSanXuat,
	LoaiDongVat,
	LoaiGiong,
	LoaiHinhSanXuat,
	Quan,
	User,
} from "@/lib/schema";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import AnimalFacEditForm from "../forms/facilities/animalFacilityEditForm";

type pageProps = {
	facilities:
		| {
				type: "animal";
				animals: LoaiDongVat[];
				_: CoSoLuuTruDongVat[];
		  }
		| {
				type: "trees";
				trees: LoaiGiong[];
				_: CoSoSanXuatCay[];
				htsx: HinhThucSanXuat[];
				lhsx: LoaiHinhSanXuat[];
		  };
	users: User[];
	districts: Quan[];
};

export default function FacilitiesTable(pageProps: pageProps) {
	function resolveDistrictByUUID(uuid: string | null) {
		if (!uuid) return "";
		const district = pageProps.districts.find(
			(district) => district.maDinhDanh == uuid
		);
		if (!district) return "";
		return district.ten;
	}
	function resolveUserByUUID(uuid: string | null) {
		if (!uuid) return "";
		const user = pageProps.users.find((user) => user.maDinhDanh == uuid);
		if (!user) return "";
		return user.ten;
	}
	switch (pageProps.facilities.type) {
		case "animal":
			const animals = pageProps.facilities.animals;
			function resolveAnimalByUUID(uuid: string | null) {
				if (!uuid) return "";
				const animal = animals.find(
					(animal) => animal.maDinhDanh == uuid
				);
				if (!animal) return "";
				return animal.ten;
			}
			return (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>UUID</TableHead>
							<TableHead>Ten</TableHead>
							<TableHead>Loai Dong Vat</TableHead>
							<TableHead>Nguoi Phu Trach</TableHead>
							<TableHead>Quan</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{pageProps.facilities._.map((fac) => {
							return (
								<Dialog key={fac.maDinhDanh}>
									<DialogTrigger asChild>
										<TableRow key={fac.maDinhDanh}>
											<TableCell>
												{fac.maDinhDanh}
											</TableCell>
											<TableCell>{fac.ten}</TableCell>
											<TableCell>
												{resolveAnimalByUUID(
													fac.maDinhDanhLoaiDongVat
												)}
											</TableCell>
											<TableCell>
												{resolveDistrictByUUID(
													fac.maDinhDanhQuan
												)}
											</TableCell>
											<TableCell>
												{resolveUserByUUID(
													fac.maDinhDanhNguoiPhuTrach
												)}
											</TableCell>
										</TableRow>
									</DialogTrigger>

									<DialogContent>
										<DialogTitle />
										<AnimalFacEditForm
											districts={pageProps.districts}
											animals={
												pageProps.facilities.type ==
												"animal"
													? pageProps.facilities
															.animals
													: []
											}
											users={pageProps.users}
											facilities={fac}
										/>
									</DialogContent>
								</Dialog>
							);
						})}
					</TableBody>
				</Table>
			);
		case "trees":
			const trees = pageProps.facilities.trees;
			function resolveTreeByUUID(uuid: string | null) {
				if (!uuid) return "";
				const tree = trees.find((tree) => tree.maDinhDanh == uuid);
				if (!tree) return "";
				return tree.ten;
			}
			return (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>UUID</TableHead>
							<TableHead>Ten</TableHead>
							<TableHead>Cong Suat</TableHead>
							<TableHead>Loai Giong Cay</TableHead>
							<TableHead>Hinh thuc San Xuat</TableHead>
							<TableHead>Loai hinh San Xuat</TableHead>
							<TableHead>Nguoi Phu Trach</TableHead>
							<TableHead>Quan</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{pageProps.facilities._.map((fac) => {
							return (
								<TableRow key={fac.maDinhDanh}>
									<TableCell>{fac.maDinhDanh}</TableCell>
									<TableCell>{fac.ten}</TableCell>
									<TableCell>{fac.congSuat} c/h</TableCell>
									<TableCell>
										{resolveTreeByUUID(
											fac.maDinhDanhLoaiGiong
										)}
									</TableCell>
									<TableCell>
										{fac.maDinhDanhHinhThucSanXuat}
									</TableCell>
									<TableCell>
										{fac.maDinhDanhLoaiHinhSanXuat}
									</TableCell>
									<TableCell>
										{resolveUserByUUID(
											fac.maDinhDanhNguoiPhuTrach
										)}
									</TableCell>
									<TableCell>
										{resolveDistrictByUUID(
											fac.maDinhDanhQuan
										)}
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			);
		default:
			return <></>;
	}
}
