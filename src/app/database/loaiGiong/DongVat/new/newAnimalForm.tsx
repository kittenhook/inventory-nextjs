"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const newAnimalSchema = z.object({
	ten: z.string(),
	moiTruongSong: z.string(),
	viTriPhanBo: z.string(),
	maDinhDanhTinhTrangBaoTon: z.string(),
	maDinhDanhLoaiBienDong: z.string(),
});

import * as React from "react";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaiBienDong, TinhTrangBaoTon } from "@/lib/schema";

type AnimalFormProps = {
	ttbt: TinhTrangBaoTon[];
	lbd: LoaiBienDong[];
};

export default function NewAnimalForm(props: AnimalFormProps) {
	const form = useForm<z.infer<typeof newAnimalSchema>>({
		resolver: zodResolver(newAnimalSchema),
		defaultValues: {
			ten: "",
			moiTruongSong: "",
			viTriPhanBo: "",
			maDinhDanhTinhTrangBaoTon: "",
			maDinhDanhLoaiBienDong: "",
		},
	});

	async function onSubmit(values: z.infer<typeof newAnimalSchema>) {
		const response = await fetch("/api/database/loaiGiong/DongVat/new", {
			method: "POST",
			body: JSON.stringify(values),
		});
		if (!response.ok) {
			alert("failed to add new animal");
			return;
		}
		alert("added successfully");
	}

	return (
		<Form {...form}>
			<form className='space-y-3' onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name='ten'
					render={({ field }) => (
						<FormItem>
							<FormLabel></FormLabel>
							<FormControl>
								<Input placeholder='Name' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='moiTruongSong'
					render={({ field }) => (
						<FormItem>
							<FormLabel></FormLabel>
							<FormControl>
								<Input placeholder='Habitat' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='viTriPhanBo'
					render={({ field }) => (
						<FormItem>
							<FormLabel></FormLabel>
							<FormControl>
								<Input placeholder='Region' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='maDinhDanhTinhTrangBaoTon'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tinh Trang Bao Ton</FormLabel>
							<Select onValueChange={field.onChange}>
								<FormControl>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{props.ttbt.map((e) => {
										return (
											<SelectItem
												key={e.maDinhDanh}
												value={e.maDinhDanh}
											>
												{e.ten}
											</SelectItem>
										);
									})}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='maDinhDanhLoaiBienDong'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Loai Bien Dong</FormLabel>
							<Select onValueChange={field.onChange}>
								<FormControl>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{props.lbd.map((e) => {
										return (
											<SelectItem
												key={e.maDinhDanh}
												value={e.maDinhDanh}
											>
												{e.ten}
											</SelectItem>
										);
									})}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='w-fill flex flex-row justify-end'>
					<Button className='w-[80px]' type='submit'>
						Create
					</Button>
				</div>
			</form>
		</Form>
	);
}
