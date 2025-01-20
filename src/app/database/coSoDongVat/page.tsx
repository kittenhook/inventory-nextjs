"use client";
import { useAuth } from "@/components/custom/AuthContext";
import ErrorPage from "@/components/custom/Error";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FacilitiesTable from "@/components/custom/tables/facilitiesTable";
import { CoSoLuuTruDongVat, LoaiDongVat, Quan, User } from "@/lib/schema";
import AnimalFacCreateForm from "@/components/custom/forms/facilities/animalFacilityCreateForm";

export default function AnimalFacPage() {
	const { isAuthenticated, isPrivileged } = useAuth();
	const [data, setData] = useState<{
		users: User[];
		districts: Quan[];
		facilities: CoSoLuuTruDongVat[];
		animals: LoaiDongVat[];
	}>({
		users: [],
		districts: [],
		facilities: [],
		animals: [],
	});
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (!isAuthenticated) return;
		(async () => {
			let animals: LoaiDongVat[] = [];
			let facilities: CoSoLuuTruDongVat[] = [];
			let users: User[] = [];
			let districts: Quan[] = [];
			const animalsResponse = await fetch("/api/database/animals");
			const facilitiesResponse = await fetch(
				"/api/database/coSo/DongVat"
			);
			const usersResponse = await fetch("/api/database/users");
			const districtsResponse = await fetch("/api/database/districts");
			if (usersResponse.ok) users = await usersResponse.json();
			if (districtsResponse.ok)
				districts = await districtsResponse.json();
			if (animalsResponse.ok) animals = await animalsResponse.json();
			if (facilitiesResponse.ok)
				facilities = await facilitiesResponse.json();
			setData({
				districts: districts,
				users: users,
				facilities: facilities,
				animals: animals,
			});
			setLoading(false);
		})();
	}, [isAuthenticated, loading]);
	if (loading) {
		return <></>;
	}

	return isAuthenticated ? (
		<div className='space-y-3 p-5'>
			<span className='text-3xl font-extrabold'>
				Co so du lieu: Co So Luu Tru Dong Vat
			</span>
			<Separator />
			<div className='w-full flex justify-end'>
				{isPrivileged ? (
					<Dialog>
						<DialogTrigger asChild>
							<Button>Them</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogTitle />
							<AnimalFacCreateForm
								users={data.users}
								districts={data.districts}
								animals={data.animals}
							/>
						</DialogContent>
					</Dialog>
				) : (
					<></>
				)}
			</div>
			<FacilitiesTable
				users={data.users}
				districts={data.districts}
				facilities={{
					type: "animal",
					animals: data.animals,
					_: data.facilities,
				}}
			/>
		</div>
	) : (
		<ErrorPage
			status_code={401}
			error_message='You are not authorized to view this page.'
		/>
	);
}
