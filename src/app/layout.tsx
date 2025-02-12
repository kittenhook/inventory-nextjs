"use client";
// import type { Metadata } from "next";
import Cookies from "js-cookie";
import "./globals.css";
import { Inter } from "next/font/google";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/custom/Sidebar";
import Footerbar from "@/components/custom/Footerbar";
// fonts
const inter = Inter({ subsets: ["latin", "vietnamese"] });

// toaster notifs
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/custom/AuthContext";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cookies = Cookies.get("session") ?? "";
	return (
		<html>
			<body className={`antialiased ${inter.className} dark bg-cover`}>
				<SidebarProvider defaultOpen={true}>
					<AuthProvider initialSession={cookies}>
						<AppSidebar />
						<div className='w-full h-screen'>
							<main className='w-full min-h-screen'>
								<SidebarTrigger />
								{children}
							</main>
							<Footerbar />
						</div>
						<Toaster />
					</AuthProvider>
				</SidebarProvider>
			</body>
		</html>
	);
}
