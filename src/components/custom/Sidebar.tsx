"use client";
import {
	Cat,
	TreePine,
	TentTree,
	ChevronUp,
	User2,
	ChevronDown,
	Columns3,
	Database,
	LogIn,
	Building2,
	LogOut,
} from "lucide-react";

import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import LoginForm from "@/components/custom/forms/auth/loginForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "../ui/separator";
import RegisterForm from "./forms/auth/registerForm";
import { User } from "@/lib/schema";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "./AuthContext";
import { useState } from "react";

type pageProps = {
	user: User | null;
};

// Menu items.
const databaseItems = [
	{
		title: "Animals",
		url: "/database",
		icon: Cat,
	},
	{
		title: "Trees",
		url: "/database/cayTrong",
		icon: TreePine,
	},
	{
		title: "Animals Facility",
		url: "#",
		icon: Columns3,
	},
	{
		title: "Trees Facility",
		url: "#",
		icon: TentTree,
	},
	{
		title: "Cities and Districts",
		url: "/database/capHanhChinh",
		icon: Building2,
	},
];

const siteItems = [
	{
		title: "Users",
		url: "/database/nguoiDung",
		icon: Database,
	},
];

export default function AppSidebar() {
	const { user, isAuthenticated } = useAuth();
	return (
		<Sidebar>
			<SidebarHeader>
				<div className='flex items-center'>
					<span className='leading-none text-3xl font-extrabold'>
						HUST2024
					</span>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Database</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{databaseItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<Collapsible className='group/collapsible'>
					<SidebarGroup>
						<SidebarGroupLabel asChild>
							<CollapsibleTrigger>
								Site Management
								<ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
							</CollapsibleTrigger>
						</SidebarGroupLabel>
						<CollapsibleContent>
							<SidebarGroupContent>
								<SidebarMenu>
									{siteItems.map((item) => (
										<SidebarMenuItem key={item.title}>
											<SidebarMenuButton asChild>
												<Link href={item.url}>
													<item.icon />
													<span>{item.title}</span>
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</CollapsibleContent>
					</SidebarGroup>
				</Collapsible>
			</SidebarContent>
			<AppSidebarFooter />
		</Sidebar>
	);
}

function AppSidebarFooter() {
	const { isAuthenticated, user, signOut } = useAuth();

	if (!isAuthenticated || !user) {
		return (
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton>
									<User2 />
									<span>Unauthenticated</span>
									<ChevronUp className='ml-auto' />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side='top'
								className='w-[--radix-popper-anchor-width]'
							>
								<Dialog>
									<DialogTrigger asChild>
										<DropdownMenuItem
											onSelect={(e) => e.preventDefault()}
										>
											<LogIn />
											<span>Authenticate</span>
										</DropdownMenuItem>
									</DialogTrigger>
									<DialogContent>
										<DialogTitle className='flex items-center'>
											<User2 /> <span>Authenticate</span>
										</DialogTitle>
										<Tabs
											defaultValue='login'
											className='space-y-3'
										>
											<TabsList className=''>
												<TabsTrigger value='login'>
													Sign in
												</TabsTrigger>
												<TabsTrigger value='register'>
													Sign up
												</TabsTrigger>
											</TabsList>
											<Separator />
											<TabsContent value='login'>
												<LoginForm />
											</TabsContent>
											<TabsContent value='register'>
												<RegisterForm />
											</TabsContent>
										</Tabs>
									</DialogContent>
								</Dialog>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		);
	}
	return (
		<SidebarFooter>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton>
								<User2 />
								<span>{user.ten}</span>
								<ChevronUp className='ml-auto' />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							side='top'
							className='w-[--radix-popper-anchor-width]'
						>
							<DropdownMenuItem onClick={signOut}>
								<LogOut />
								<span>Sign out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	);
}
