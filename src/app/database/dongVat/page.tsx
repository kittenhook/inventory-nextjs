"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { LoaiBienDong, LoaiDongVat, TinhTrangBaoTon } from "@/lib/schema";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/custom/AuthContext";
import ErrorPage from "@/components/custom/Error";
import AnimalTable from "@/components/custom/tables/animalsTable";
import AnimalCreateForm from "@/components/custom/forms/animals/animalCreateForm";

export default function AnimalPage() {
	const { isAuthenticated, loadingAuth, isPrivileged } = useAuth();
	const [data, setData] = useState<{
		animals: LoaiDongVat[];
		ttbt: TinhTrangBaoTon[];
		lbd: LoaiBienDong[];
	}>({
		animals: [],
		ttbt: [],
		lbd: [],
	});
	useEffect(() => {
		if (!isAuthenticated) return;
		(async () => {
			let animalsArray: LoaiDongVat[] = [];
			let ttbtsArray: TinhTrangBaoTon[] = [];
			let lbdsArray: LoaiBienDong[] = [];
			const animalsResponse = await fetch("/api/database/animals");
			const lbdResponse = await fetch("/api/database/LoaiBienDong");
			const TinhTrangBaoTonResponse = await fetch(
				"/api/database/TinhTrangBaoTon"
			);
			if (animalsResponse.ok) animalsArray = await animalsResponse.json();
			if (lbdResponse.ok) lbdsArray = await lbdResponse.json();
			if (TinhTrangBaoTonResponse.ok)
				ttbtsArray = await TinhTrangBaoTonResponse.json();
			setData({
				animals: animalsArray,
				lbd: lbdsArray,
				ttbt: ttbtsArray,
			});
		})();
	}, [isAuthenticated]);
	if (loadingAuth) {
		return <></>;
	}

	return isAuthenticated ? (
		<div className='space-y-3 p-5'>
			<span className='text-3xl font-extrabold'>
				Cơ sở dữ liệu: Loài động vật
			</span>
			<Separator />
			<div className='w-full flex justify-end'>
				{isPrivileged ? (
					<Dialog>
						<DialogTrigger asChild>
							<Button>Thêm</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogTitle />
							<AnimalCreateForm lbd={data.lbd} ttbt={data.ttbt} />
						</DialogContent>
					</Dialog>
				) : (
					<></>
				)}
			</div>
			<AnimalTable
				animals={data.animals}
				tinhTrangBaoTon={data.ttbt}
				loaiBienDong={data.lbd}
			/>
		</div>
	) : (
		<ErrorPage
			status_code={401}
			error_message='You are not authorized to see this page.'
		/>
	);
}
