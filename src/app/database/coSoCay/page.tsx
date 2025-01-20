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
import {
	CoSoSanXuatCay,
	HinhThucSanXuat,
	LoaiGiong,
	LoaiHinhSanXuat,
	Quan,
	User,
} from "@/lib/schema";
import TreeFacCreateForm from "@/components/custom/forms/facilities/treeFacilityCreateForm";

export default function AnimalFacPage() {
	const { isAuthenticated, isPrivileged } = useAuth();
	const [data, setData] = useState<{
		htsx: HinhThucSanXuat[];
		lhsx: LoaiHinhSanXuat[];
		users: User[];
		districts: Quan[];
		facilities: CoSoSanXuatCay[];
		trees: LoaiGiong[];
	}>({
		users: [],
		districts: [],
		facilities: [],
		trees: [],
		htsx: [],
		lhsx: [],
	});
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (!isAuthenticated) return;
		(async () => {
			let trees: LoaiGiong[] = [];
			let facilities: CoSoSanXuatCay[] = [];
			let users: User[] = [];
			let districts: Quan[] = [];
			let htsx: HinhThucSanXuat[] = [];
			let lhsx: LoaiHinhSanXuat[] = [];
			const treesResponse = await fetch("/api/database/trees");
			const facilitiesResponse = await fetch("/api/database/coSo/Cay");
			const usersResponse = await fetch("/api/database/users");
			const districtsResponse = await fetch("/api/database/districts");
			const lhsxResponse = await fetch("/api/database/loaiHinhSanXuat");
			const htsxResponse = await fetch("/api/database/hinhThucSanXuat");
			if (usersResponse.ok) users = await usersResponse.json();
			if (districtsResponse.ok)
				districts = await districtsResponse.json();
			if (treesResponse.ok) trees = await treesResponse.json();
			if (facilitiesResponse.ok)
				facilities = await facilitiesResponse.json();
			if (lhsxResponse.ok) lhsx = await lhsxResponse.json();
			if (htsxResponse.ok) htsx = await htsxResponse.json();
			setData({
				districts: districts,
				users: users,
				facilities: facilities,
				trees: trees,
				htsx: htsx,
				lhsx: lhsx,
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
				Co so du lieu: Co So San Xuat Cay
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
							<TreeFacCreateForm
								trees={data.trees}
								districts={data.districts}
								users={data.users}
								htsx={data.htsx}
								lhsx={data.lhsx}
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
					type: "trees",
					trees: data.trees,
					_: data.facilities,
					htsx: data.htsx,
					lhsx: data.lhsx,
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
