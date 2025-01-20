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
import { Role } from "@/lib/schema";
import { useAuth } from "@/components/custom/AuthContext";
import ErrorPage from "@/components/custom/Error";
import RoleTable from "@/components/custom/tables/rolesTable";
import RoleCreateForm from "@/components/custom/forms/roles/roleCreateForm";

export default function TreePage() {
	const [roles, setRoles] = useState<Role[]>([]);
	const [loading, setLoading] = useState(true);
	const { isAuthenticated, isPrivileged } = useAuth();
	useEffect(() => {
		if (!isAuthenticated) return;
		(async () => {
			const rolesResponse = await fetch("/api/database/roles");
			if (!rolesResponse.ok) {
				return;
			}
			const roles = await rolesResponse.json();
			setRoles(roles);
			setLoading(false);
		})();
	}, [isAuthenticated]);
	if (loading) return <></>;
	return isAuthenticated && isPrivileged ? (
		<div className='space-y-3 p-5'>
			<span className='text-3xl font-extrabold'>
				Cơ sở dữ liệu: Quyền
			</span>
			<Separator />
			<div className='w-full flex justify-end'>
				<Dialog>
					<DialogTrigger asChild>
						<Button>Thêm</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogTitle />
						<RoleCreateForm />
					</DialogContent>
				</Dialog>
			</div>
			<RoleTable roles={roles} />
		</div>
	) : (
		<ErrorPage
			status_code={401}
			error_message='You are not authorized to view this page.'
		/>
	);
}
