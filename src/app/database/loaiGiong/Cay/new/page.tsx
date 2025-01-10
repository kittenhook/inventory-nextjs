import Navbar from "@/components/custom/Navbar";
import NewTreeForm from "./newTreeForm";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	retrieveAllLoaiBienDong,
	retrieveAllTinhTrangBaoTon,
} from "@/lib/dbInteractions";

export default async function newTreePage() {
	const ttbt = await retrieveAllTinhTrangBaoTon();
	const lbd = await retrieveAllLoaiBienDong();
	return (
		<div className='mx-[100px] w-fill flex'>
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
