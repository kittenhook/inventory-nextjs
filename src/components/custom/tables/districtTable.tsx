import { Quan } from "@/lib/schema";
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
	districts: Quan[];
};

export default function DistrictsTable(pageProps: pageProps) {
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
				{pageProps.districts.map((district) => {
					return (
						<Dialog key={district.maDinhDanh}>
							<DialogTrigger asChild>
								<TableRow>
									<TableCell>{district.maDinhDanh}</TableCell>
									<TableCell>{district.ten}</TableCell>
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
