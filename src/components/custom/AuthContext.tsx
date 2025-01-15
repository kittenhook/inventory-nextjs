"use client";

import { useToast } from "@/hooks/use-toast";
import { Session, User } from "@/lib/schema";
import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect, useState } from "react";

type loginData = { email: string; password: string };
type registerData = { name: string; email: string; password: string };

type AuthContextType = {
	isAuthenticated: boolean;
	user: User | null;
	signOut: () => void;
	signIn: (loginData: loginData) => void;
	signUp: (registerData: registerData) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
	children,
	initialSession,
}: {
	children: React.ReactNode;
	initialSession: string;
}) {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
		!!initialSession
	);
	const [user, setUser] = useState<User | null>(null);
	const { toast } = useToast();

	const signOut = async () => {
		const response = await fetch("/api/auth/logout", {
			method: "POST",
		});
		if (!response.ok) {
			return 1;
		}
		Cookies.remove("session");
		setIsAuthenticated(false);
		setUser(null);
	};

	const signUp = async (registerData: registerData) => {
		const response = await fetch("/api/auth/register", {
			method: "POST",
			body: JSON.stringify(registerData),
		});
		const date = new Date(Date.now());
		if (!response.ok) {
			toast({
				variant: "destructive",
				title: "Failed to sign in.",
				description: `${date.toTimeString()}, ${date.toLocaleDateString()}`,
			});
			return;
		}
		const responseData: User = await response.json();
		setUser(responseData);
		setIsAuthenticated(true);
	};

	const signIn = async (loginData: loginData) => {
		const response = await fetch("/api/auth/login", {
			method: "POST",
			body: JSON.stringify(loginData),
		});
		const date = new Date(Date.now());
		if (!response.ok) {
			toast({
				variant: "destructive",
				title: "Failed to sign in.",
				description: `${date.toTimeString()}, ${date.toLocaleDateString()}`,
			});
			return;
		}
		const responseData: User = await response.json();
		setUser(responseData);
		setIsAuthenticated(true);
	};
	useEffect(() => {
		(async () => {
			const response = await fetch("/api/auth/authenticate");
			if (!response.ok) {
				setUser(null);
				setIsAuthenticated(false);
				return;
			}
			const responseData: User = await response.json();
			setUser(responseData);
			setIsAuthenticated(true);
			return;
		})();
	}, []);

	return (
		<AuthContext.Provider
			value={{ user, isAuthenticated, signUp, signOut, signIn }}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
