import { FacebookIcon, InstagramIcon, PhoneIncoming } from "lucide-react";
import Link from "next/link";

export default function Footerbar() {
	return (
		<div className='w-full h-[300px] bg-gray-100 p-5 rounded-lg flex'>
			<div className='mx-[300px] text-muted-foreground h-full space-y-3 flex flex-col justify-center items-center'>
				<div className='flex gap-3'>
					<FacebookIcon />
					<span>@HUST2024</span>
				</div>
				<div className='flex gap-3'>
					<InstagramIcon />
					<span>@hust_2024</span>
				</div>
				<div className='flex gap-3'>
					<PhoneIncoming />
					<span>055 914 7455</span>
				</div>
			</div>
		</div>
	);
}
