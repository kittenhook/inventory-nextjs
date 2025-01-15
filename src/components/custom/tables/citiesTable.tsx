import { ThanhPho } from "@/lib/schema";
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
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
type pageProps = {
	cities: ThanhPho[];
};

export default function CitiesTable(pageProps: pageProps) {
	return (
		<Table>
			{/* <TableCaption>A list of your recent invoices.</TableCaption> */}
			<TableHeader>
				<TableRow>
					<TableHead>UUID</TableHead>
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
								{/* <TreeEditForm tree={city} /> */}
							</DialogContent>
						</Dialog>
					);
				})}
			</TableBody>
		</Table>
	);
}
