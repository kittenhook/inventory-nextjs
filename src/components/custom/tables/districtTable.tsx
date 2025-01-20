import { Quan, ThanhPho } from "@/lib/schema";
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
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import DistrictEditForm from "../forms/c_and_d/districtEditForm";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
type pageProps = {
	cities: ThanhPho[];
	districts: Quan[];
};

export default function DistrictsTable(pageProps: pageProps) {
	const [filteredTable, setFilteredTable] = useState<Quan[]>(
		pageProps.districts
	);
	const [searchTerm, setSearchTerm] = useState("");
	function findCityByUUID(uuid: string | null): string {
		if (!uuid) return "";
		const city = pageProps.cities.find((city) => city.maDinhDanh == uuid);
		if (!city) return "";
		return city.ten;
	}
	useEffect(() => {
		if (searchTerm == "") {
			setFilteredTable(pageProps.districts);
			return;
		}
		setFilteredTable(
			pageProps.districts.filter(
				(dc) =>
					dc.ten.toLowerCase().includes(searchTerm.toLowerCase()) ||
					findCityByUUID(dc.maDinhDanhThanhPho)
						.toLowerCase()
						.includes(searchTerm.toLowerCase())
			)
		);
	}, [pageProps.districts, searchTerm]);
	return (
		<div className='flex flex-col min-w-[50%] space-y-3'>
			<Input onChange={(e) => setSearchTerm(e.target.value)} />
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>UUID</TableHead>
						<TableHead>Tên</TableHead>
						<TableHead>Thành phố</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredTable.map((district) => {
						return (
							<Dialog key={district.maDinhDanh}>
								<DialogTrigger asChild>
									<TableRow>
										<TableCell>
											{district.maDinhDanh}
										</TableCell>
										<TableCell>{district.ten}</TableCell>
										<TableCell>
											{findCityByUUID(
												district.maDinhDanhThanhPho
											)}
										</TableCell>
									</TableRow>
								</DialogTrigger>
								<DialogContent>
									<DialogTitle />
									<DistrictEditForm
										district={district}
										cities={pageProps.cities}
									/>
								</DialogContent>
							</Dialog>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
}
