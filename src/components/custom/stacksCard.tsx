import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

type pageProps = {
	imagePath: string;
	libraryName: string;
	libraryVersion: string;
	description: string;
};

export default function StacksCard(props: pageProps) {
	return (
		<Card className='h-auto'>
			<div className='w-[128px] h-[128px] p-6 flex flex-row justify-center items-center rounded-md'>
				<Image
					src={props.imagePath}
					alt=''
					width={64}
					height={64}
					className='rounded-lg'
				></Image>
			</div>
			<CardHeader>
				<CardTitle>
					{props.libraryName} @ {props.libraryVersion}
				</CardTitle>
				{/* <CardDescription>{props.description}</CardDescription> */}
				<p>{props.description}</p>
			</CardHeader>
		</Card>
	);
}
