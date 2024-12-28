import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
	NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import Link from "next/link";
import { Button } from "@/components/ui/button";

function loggedInOrNot() {
	const loggedIn = false;
	if (!loggedIn) {
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
			Welcome back, <Link href='/user/hallo'>user!</Link>
		</span>
	);
}

export default function Navbar() {
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
								<Link
									href='/database'
									className={navigationMenuTriggerStyle()}
								>
									Database
								</Link>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
				<div className='flex gap-1 items-center'>{loggedInOrNot()}</div>
			</div>
		</div>
	);
}
