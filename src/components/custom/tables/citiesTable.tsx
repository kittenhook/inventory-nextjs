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
type pageProps = {
	cities: ThanhPho[];
};

export default function CitiesTable(pageProps: pageProps) {
	return (
		<Table>
			{/* <TableCaption>A list of your recent invoices.</TableCaption> */}
			<TableHeader>
				<TableRow>
					<TableHead className='max-w-[320px]'>UUID</TableHead>
					<TableHead>Name</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{pageProps.cities.map((city) => {
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
	);
}
