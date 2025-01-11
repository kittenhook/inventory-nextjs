"use server";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	// NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { cookies } from "next/headers";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DatabasePages = {
	title: string;
	description: string;
	url: string;
}[];

const databasePages: DatabasePages = [
	{
		title: "Users",
		description: "Database of users.",
		url: "/database/nguoiDung",
	},
	{
		title: "Roles",
		description: "Database of all roles.",
		url: "/database/Quyen",
	},
	{
		title: "Trees",
		description: "Database of all trees.",
		url: "/database/loaiGiong/Cay",
	},
	{
		title: "Animals",
		description: "Database of all animals.",
		url: "/database/loaiGiong/DongVat",
	},

	{
		title: "Tree facilities",
		description: "Database of tree facilities.",
		url: "/database/coSo/SanXuatCayTrong",
	},
	{
		title: "Animal facilities",
		description: "Database of animal facilities.",
		url: "/database/coSo/LuuTruDongVat",
	},
];

async function loggedInOrNot() {
	const cookieStore = await cookies();
	const sessionObjectJSON = cookieStore.get("sessionObject")!.value || "{}";
	const sessionObject = JSON.parse(sessionObjectJSON);
	if (!sessionObject) {
		return (
			<div className='flex gap-1'>
				<Button asChild>
					<Link href='/auth/login'>Login</Link>
				</Button>
				<Button asChild>
					<Link href='/auth/register'>Register</Link>
				</Button>
			</div>
		);
	}
	return (
		<span>
			Welcome back,{" "}
			<Link href={`/database/nguoiDung/${sessionObject.user.maDinhDanh}`}>
				{sessionObject.user.ten}!
			</Link>
		</span>
	);
}

export default async function Navbar() {
	return (
		<div className='w-full h-[50px] flex items-center gap-7 border-b-2 border-gray-200'>
			<span>HUST2024</span>
			<div className='flex justify-between w-full items-center'>
				<div>
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<Link
									href='/home'
									className={navigationMenuTriggerStyle()}
								>
									Home
								</Link>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuTrigger>
									Database
								</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className='grid grid-cols-1 lg:grid-cols-2 w-max gap-1 p-4'>
										{databasePages.map((page) => {
											return (
												<li
													key={page.title}
													className={cn(
														navigationMenuTriggerStyle(),
														"w-full h-auto block"
													)}
												>
													<Link href={page.url}>
														<p className='font-extrabold'>
															{page.title}
														</p>
														<p>
															{page.description}
														</p>
													</Link>
												</li>
											);
										})}
									</ul>
								</NavigationMenuContent>
								{/* <Link
									href='/database'
									className={navigationMenuTriggerStyle()}
								>
									Database
								</Link> */}
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
				<div className='flex gap-1 items-center'>{loggedInOrNot()}</div>
			</div>
		</div>
	);
}
