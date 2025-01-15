import * as React from "react";
import { Separator } from "@/components/ui/separator";

export default function MarkdownPost({
	pageProps,
	children,
}: {
	children: React.ReactNode;
	pageProps: {
		title: string;
		description: string;
	};
}) {
	return (
		<div className='space-y-2'>
			{/* header */}
			<span>{pageProps.title}</span>
			<span>{pageProps.description}</span>
			<Separator orientation='horizontal' />

			{/* body */}
			<div>{children}</div>
		</div>
	);
}
