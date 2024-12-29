import Navbar from "@/components/custom/Navbar";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export default async function DongVat() {
	const response = await fetch("/api/database/loaiGiong/DongVat", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	console.log(response);

	const responseData = await response.json();

	if (!response.ok) {
		alert("client-side error");
		return;
	}
	console.log(responseData);

	return (
		<div className='mx-[100px]'>
			<Navbar></Navbar>
			<div></div>
		</div>
	);
}
