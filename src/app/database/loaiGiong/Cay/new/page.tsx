import Navbar from "@/components/custom/Navbar";
import NewTreeForm from "./newTreeForm";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
export default async function newTreePage() {
	return (
		<div className='mx-[100px] w-fill flex'>
			<Navbar></Navbar>
			<div className='w-fill flex justify-center items-center'>
				<Card>
					<CardHeader>
						<CardTitle>New Animal</CardTitle>
					</CardHeader>
					<CardContent>
						<NewTreeForm></NewTreeForm>
					</CardContent>
					<CardFooter></CardFooter>
				</Card>
			</div>
		</div>
	);
}
