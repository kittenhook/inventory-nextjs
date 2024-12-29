import Navbar from "@/components/custom/Navbar";
import { retrieveAllPosts } from "@/lib/postInteractions";
import Link from "next/link";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default async function Home() {
	// const posts = await retrieveAllPosts();
	return (
		<div className='mx-[100px] flex flex-col gap-3'>
			<Navbar></Navbar>
			<div className='w-fill flex justify-center items-center'>
				<Card className='w-[350px]'>
					<CardHeader>
						<CardTitle>HUST2024 Database</CardTitle>
						<CardDescription>
							Made in TypeScript 5, w/ hugs and kisses
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p>Feel free to explore around the pages!</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
