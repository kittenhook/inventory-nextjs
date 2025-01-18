import { CircleX } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
type pageProps = {
	status_code: number;
	error_message: string;
};

export default function ErrorPage(pageProps: pageProps) {
	return (
		<div className='w-full h-screen flex items-center justify-center'>
			<Card className='w-[450px]'>
				<CardHeader className='flex'>
					<CircleX />
					<span>An error has happened!</span>
				</CardHeader>
				<CardContent>
					<span className='font-extrabold'>
						{pageProps.status_code}
						<span className='text-muted-foreground'> - </span>
						{pageProps.error_message}
					</span>
				</CardContent>
			</Card>
		</div>
	);
}
