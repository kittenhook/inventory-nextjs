"use client";
// import type { Metadata } from "next";
import Cookies from "js-cookie";
import "./globals.css";
import { Inter } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/custom/Sidebar";
import Footerbar from "@/components/custom/Footerbar";
// fonts
const inter = Inter({ subsets: ["latin", "vietnamese"] });

// toaster notifs
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/custom/AuthContext";
import { useEffect, useState } from "react";
import { User } from "@/lib/schema";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cookies = Cookies.get("session") ?? "";
	return (
		<html>
			<body className={`antialiased dark ${inter.className}`}>
				<SidebarProvider open>
					<AuthProvider initialSession={cookies}>
						<AppSidebar />
						<div className='w-full h-screen'>
							<main className='w-full min-h-screen'>
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
