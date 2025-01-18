"use client";
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

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaiBienDong, LoaiDongVat, TinhTrangBaoTon } from "@/lib/schema";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

type pageProps = {
	animal: LoaiDongVat;
	loaiBienDong: LoaiBienDong[];
	TinhTrangBaoTon: TinhTrangBaoTon[];
};

const animalSchema = z.object({
	ten: z.string().min(1, {
		message: "A name must be provided",
	}),
	moiTruongSong: z.string().min(1, {
		message: "A valid environment must be provided",
	}),
	viTriPhanBo: z.string().min(1, {
		message: "A valid region must be provided",
	}),
	maDinhDanhLoaiBienDong: z.string().min(1, {
		message: "A valid difference must be provided",
	}),
	maDinhDanhTinhTrangBaoTon: z.string().min(1, {
		message: "A valid preservation level must be provided.",
	}),
});

export default function AnimalEditForm(pageProps: pageProps) {
	const { toast } = useToast();
	const router = useRouter();

	const form = useForm<z.infer<typeof animalSchema>>({
		resolver: zodResolver(animalSchema),
		defaultValues: {
			ten: pageProps.animal.ten,
			moiTruongSong: pageProps.animal.moiTruongSong || "",
			viTriPhanBo: pageProps.animal.viTriPhanBo || "",
			maDinhDanhLoaiBienDong:
				pageProps.animal.maDinhDanhLoaiBienDong || "",
			maDinhDanhTinhTrangBaoTon:
				pageProps.animal.maDinhDanhTinhTrangBaoTon || "",
		},
	});
	async function handleSubmission(values: z.infer<typeof animalSchema>) {
		console.log(values);
		const response = await fetch(
			`/api/database/animals/${pageProps.animal.maDinhDanh}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...values }),
			}
		);
		const date = new Date(Date.now());

		if (!response.ok) {
			toast({
				variant: "destructive",
				title: "Failed to update animal's data.",
				description: `${date.toTimeString()}, ${date.toLocaleDateString()}`,
			});
			return;
		}
		toast({
			title: "Updated animal's data.",
			description: `${date.toTimeString()}, ${date.toLocaleDateString()}`,
		});
		router.refresh();
	}

	return (
		<div className='space-y-3'>
			<span className='text-2xl font-semibold tracking-tight'>
				Update a tree.
			</span>
			<Form {...form}>
				<form
					id='treeEditForm'
					className='space-y-3'
					onSubmit={form.handleSubmit(handleSubmission)}
				>
					<Label>UUID</Label>
					<Input disabled placeholder={pageProps.animal.maDinhDanh} />
					<FormField
						control={form.control}
						name='ten'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
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
								<FormLabel>Moi truong song</FormLabel>
								<FormControl>
									<Input {...field} />
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
								<FormLabel>Vi tri phan bo</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='maDinhDanhLoaiBienDong'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Loai bien dong</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{pageProps.loaiBienDong.map((lbd) => {
											return (
												<SelectItem
													key={lbd.maDinhDanh}
													value={lbd.maDinhDanh}
												>
													{lbd.ten}
												</SelectItem>
											);
										})}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
			<div className='flex items-center justify-between gap-3 mx-2'>
				<Button variant='destructive'>Delete</Button>
				<Button type='submit' form='treeEditForm'>
					Update
				</Button>
			</div>
		</div>
	);
}
