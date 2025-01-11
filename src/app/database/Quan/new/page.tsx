import Navbar from "@/components/custom/Navbar";
import NewRoleForm from "./newRoleForm";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
export default async function newTreePage() {
	return (
		<div className='mx-[100px] w-fill flex flex-col'>
			<Navbar></Navbar>
			<div className='w-fill flex justify-center items-center'>
				<Card>
					<CardHeader>
						<CardTitle>New Role</CardTitle>
					</CardHeader>
					<CardContent>
						<NewRoleForm></NewRoleForm>
					</CardContent>
					<CardFooter></CardFooter>
				</Card>
			</div>
		</div>
	);
}
