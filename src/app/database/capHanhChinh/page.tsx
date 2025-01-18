"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import CitiesTable from "@/components/custom/tables/citiesTable";
import DistrictsTable from "@/components/custom/tables/districtTable";
import { Quan, ThanhPho } from "@/lib/schema";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/custom/AuthContext";
import ErrorPage from "@/components/custom/Error";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CityCreateForm from "@/components/custom/forms/c_and_d/cityCreateForm";
import DistrictCreateForm from "@/components/custom/forms/c_and_d/districtCreateForm";

export default function CAndDPage() {
	const { isAuthenticated, loadingAuth } = useAuth();
	const [data, setData] = useState<{
		cities: ThanhPho[];
		districts: Quan[];
	}>({
		cities: [],
		districts: [],
	});
	useEffect(() => {
		if (!isAuthenticated) return;
		(async () => {
			let districtsArray: Quan[] = [];
			let citiesArray: ThanhPho[] = [];
			const citiesResponse = await fetch("/api/database/cities");
			const districtResponse = await fetch("/api/database/districts");
			if (citiesResponse.ok) citiesArray = await citiesResponse.json();
			if (districtResponse.ok)
				districtsArray = await districtResponse.json();
			setData({
				cities: citiesArray,
				districts: districtsArray,
			});
		})();
	}, [isAuthenticated]);
	if (loadingAuth) {
		return <></>;
	}

	return isAuthenticated ? (
		<div className='space-y-3 p-5'>
			<span className='text-3xl font-extrabold'>
				Cities and Districts database
			</span>
			<Separator />
			<div className='w-full flex justify-end'>
				<Dialog>
					<DialogTrigger asChild>
						<Button>Add a record!</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogTitle />
						<Tabs defaultValue='city' className='space-y-3'>
							<TabsList>
								<TabsTrigger value='city'>City</TabsTrigger>
								<TabsTrigger value='district'>
									District
								</TabsTrigger>
							</TabsList>
							<TabsContent value='city'>
								<CityCreateForm />
							</TabsContent>
							<TabsContent value='district'>
								<DistrictCreateForm cities={data.cities} />
							</TabsContent>
						</Tabs>
					</DialogContent>
				</Dialog>
			</div>
			<div className='flex gap-3'>
				<CitiesTable cities={data.cities} />
				<DistrictsTable
					districts={data.districts}
					cities={data.cities}
				/>
			</div>
		</div>
	) : (
		<ErrorPage
			status_code={401}
			error_message='You are not authorized to see this page.'
		/>
	);
}
