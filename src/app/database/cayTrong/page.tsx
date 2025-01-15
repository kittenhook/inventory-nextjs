import TreeTable from "@/components/custom/tables/treeTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { retrieveAllTrees } from "@/lib/dbInteractions";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import TreeCreateForm from "@/components/custom/forms/trees/treeCreateForm";

export default async function TreePage() {
	const trees = await retrieveAllTrees();
	return (
		<div className='space-y-3 p-5'>
			<span className='text-3xl font-extrabold'>Tree database</span>
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
			<TreeTable trees={trees} />
		</div>
	);
}
