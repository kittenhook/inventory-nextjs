"use client";
import Navbar from "@/components/custom/Navbar";
import Sidebar from "@/components/custom/Sidebar";

export default function Home() {
	return (
		<div className='flex h-screen mx-[100px]'>
			<Navbar></Navbar>
			<Sidebar></Sidebar>
		</div>
	);
}
