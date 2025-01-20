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
		message: "Phải điền tên loài động vật.",
	}),
	moiTruongSong: z.string().min(1, {
		message: "Phải điền môi trường sống.",
	}),
	viTriPhanBo: z.string().min(1, {
		message: "Phải điền vị trí phân bổ.",
	}),
	maDinhDanhLoaiBienDong: z.string().min(1, {
		message: "Phải chọn một loại biến động hợp lệ.",
	}),
	maDinhDanhTinhTrangBaoTon: z.string().min(1, {
		message: "Phải chọn một tình trạng bảo tồn hợp lệ.",
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

	async function deleteData() {
		const response = await fetch(
			`/api/database/animals/${pageProps.animal.maDinhDanh}`,
			{
				method: "DELETE",
			}
		);
		const date = new Date(Date.now());
		if (!response.ok) {
			toast({
				variant: "destructive",
				title: "Không xóa được loài động vật.",
				description: `${date.toTimeString()}, ${date.toLocaleDateString()}`,
			});
			return;
		}
		toast({
			title: "Đã xóa loài động vật.",
			description: `${date.toTimeString()}, ${date.toLocaleDateString()}`,
		});
	}
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
				title: "Không cập nhật được loài động vật.",
				description: `${date.toTimeString()}, ${date.toLocaleDateString()}`,
			});
			return;
		}
		toast({
			title: "Đã cập nhật loài động vật.",
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
					<FormField
						control={form.control}
						name='ten'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tên</FormLabel>
								<FormControl>
									<Input placeholder='Lợn rừng' {...field} />
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
								<FormLabel>Môi trường sống</FormLabel>
								<FormControl>
									<Input placeholder='Tự nhiên' {...field} />
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
								<FormLabel>Vị trí phân bổ</FormLabel>
								<FormControl>
									<Input placeholder='Đồng bằng' {...field} />
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
								<FormLabel>Loại biến động</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Chọn một loại biến động' />
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
					<FormField
						control={form.control}
						name='maDinhDanhTinhTrangBaoTon'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tình trạng bảo tồn</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Chọn một tình trạng bảo tồn' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{pageProps.TinhTrangBaoTon.map(
											(ttbt) => {
												return (
													<SelectItem
														key={ttbt.maDinhDanh}
														value={ttbt.maDinhDanh}
													>
														{ttbt.ten}
													</SelectItem>
												);
											}
										)}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
			<div className='flex items-center justify-between gap-3 mx-2'>
				<Button variant='destructive' onClick={deleteData}>
					Delete
				</Button>
				<Button type='submit' form='treeEditForm'>
					Update
				</Button>
			</div>
		</div>
	);
}
