import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { retrieveAllCities, retrieveAllDistricts } from "@/lib/dbInteractions";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import TreeCreateForm from "@/components/custom/forms/trees/treeCreateForm";
import CitiesTable from "@/components/custom/tables/citiesTable";
import DistrictsTable from "@/components/custom/tables/districtTable";

export default async function CAndDPage() {
	const cities = await retrieveAllCities();
	const districts = await retrieveAllDistricts();

	return (
		<div className='space-y-3 p-5'>
			<span className='text-3xl font-extrabold'>
				Cities and Districts database
			</span>
			<div></div>
			<div></div>
			<Separator />
			<div className='w-full flex justify-end'>
				<Dialog>
					<DialogTrigger asChild>
						<Button>Add a record!</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogTitle />
						<TreeCreateForm />
					</DialogContent>
				</Dialog>
			</div>
			<div className='flex gap-3'>
				<CitiesTable cities={cities} />
				<DistrictsTable districts={districts} />
			</div>
		</div>
	);
}
