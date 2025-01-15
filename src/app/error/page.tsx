import { CircleX } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
type pageProps = {
	status_code: number;
	error_message: string;
};

export default function ErrorPage(pageProps: pageProps) {
	return (
		<div className='w-full h-screen flex items-center justify-center'>
			<Card className='w-[400px]'>
				<CardHeader>
					<CircleX />
					<span>An error has happened!</span>
				</CardHeader>
				<CardContent>
					<pre>{pageProps.status_code || 500}</pre>
					<pre>{pageProps.error_message || "Server-side error."}</pre>
				</CardContent>
			</Card>
		</div>
	);
}
