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
type pageProps = {
	cities: ThanhPho[];
	districts: Quan[];
};

export default function DistrictsTable(pageProps: pageProps) {
	function findCityByUUID(uuid: string | null): string {
		if (!uuid) return "";
		const city = pageProps.cities.find((city) => city.maDinhDanh == uuid);
		if (!city) return "";
		return city.ten;
	}
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>UUID</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>City</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{pageProps.districts.map((district) => {
					return (
						<Dialog key={district.maDinhDanh}>
							<DialogTrigger asChild>
								<TableRow>
									<TableCell>{district.maDinhDanh}</TableCell>
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
	);
}
