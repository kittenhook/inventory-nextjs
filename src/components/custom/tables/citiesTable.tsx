import { ThanhPho } from "@/lib/schema";
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
import CityEditForm from "../forms/c_and_d/cityEditForm";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
type pageProps = {
	cities: ThanhPho[];
};

export default function CitiesTable(pageProps: pageProps) {
	const [filteredTable, setFilteredTable] = useState<ThanhPho[]>(
		pageProps.cities
	);
	const [searchTerm, setSearchTerm] = useState("");
	useEffect(() => {
		if (searchTerm == "") {
			setFilteredTable(pageProps.cities);
			return;
		}
		setFilteredTable(
			pageProps.cities.filter((city) =>
				city.ten.toLowerCase().includes(searchTerm.toLowerCase())
			)
		);
	}, [searchTerm, pageProps.cities]);

	return (
		<div className='flex flex-col min-w-[50%] space-y-3'>
			<Input onChange={(e) => setSearchTerm(e.target.value)} />
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>UUID</TableHead>
						<TableHead>Tên</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredTable.map((city) => {
						return (
							<Dialog key={city.maDinhDanh}>
								<DialogTrigger asChild>
									<TableRow>
										<TableCell>{city.maDinhDanh}</TableCell>
										<TableCell>{city.ten}</TableCell>
									</TableRow>
								</DialogTrigger>
								<DialogContent>
									<DialogTitle />
									<CityEditForm city={city} />
								</DialogContent>
							</Dialog>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
}
