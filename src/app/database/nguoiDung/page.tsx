"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { User, Role } from "@/lib/schema";
import { useAuth } from "@/components/custom/AuthContext";
import ErrorPage from "@/components/custom/Error";
import UserTable from "@/components/custom/tables/usersTable";

export default function UserPage() {
	const [data, setData] = useState<{
		users: User[];
		roles: Role[];
	}>({
		users: [],
		roles: [],
	});
	const [loading, setLoading] = useState(true);
	const { isAuthenticated } = useAuth();
	useEffect(() => {
		if (!isAuthenticated) return;
		(async () => {
			let usersArray: User[] = [];
			let rolesArray: Role[] = [];
			const usersResponse = await fetch("/api/database/users");
			const rolesResponse = await fetch("/api/database/roles");
			if (usersResponse.ok) usersArray = await usersResponse.json();
			if (rolesResponse.ok) rolesArray = await rolesResponse.json();
			setData({
				users: usersArray,
				roles: rolesArray,
			});
			setLoading(false);
		})();
	}, [isAuthenticated, loading]);
	if (loading) return <></>;
	return isAuthenticated ? (
		<div className='space-y-3 p-5'>
			<span className='text-3xl font-extrabold'>Tree database</span>
			<Separator />
			<div className='w-full flex justify-end'>
				<Dialog>
					<DialogTrigger asChild>
						<Button>Add a record!</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogTitle />
						{/* <TreeCreateForm /> */}
					</DialogContent>
				</Dialog>
			</div>
			<UserTable users={data.users} roles={data.roles} />
		</div>
	) : (
		<ErrorPage
			status_code={401}
			error_message='You are not authorized to view this page.'
		/>
	);
}
