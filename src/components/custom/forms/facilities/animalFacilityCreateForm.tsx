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
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { LoaiDongVat, Quan, User } from "@/lib/schema";

const newTreeSchema = z.object({
	ten: z.string().min(1, {
		message: "A name must be provided",
	}),
	maDinhDanhLoaiDongVat: z.string().min(1),
	maDinhDanhNguoiPhuTrach: z.string().min(1),
	maDinhDanhQuan: z.string().min(1),
});

type pageProps = {
	districts: Quan[];
	users: User[];
	animals: LoaiDongVat[];
};

export default function AnimalFacCreateForm(pageProps: pageProps) {
	const { toast } = useToast();
	const router = useRouter();
	const form = useForm<z.infer<typeof newTreeSchema>>({
		resolver: zodResolver(newTreeSchema),
		defaultValues: {
			ten: "",
			maDinhDanhLoaiDongVat: "",
			maDinhDanhNguoiPhuTrach: "",
			maDinhDanhQuan: "",
		},
	});
	async function HandleSubmission(values: z.infer<typeof newTreeSchema>) {
		const response = await fetch(`/api/database/coSo/DongVat/new`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				...values,
			}),
		});
		const date = new Date(Date.now());

		if (!response.ok) {
			toast({
				variant: "destructive",
				title: "Khong tao duoc co so luu tru dong vat.",
				description: `${date.toTimeString()}, ${date.toLocaleDateString()}`,
			});
			return;
		}
		toast({
			title: "Da tao co so luu tru dong vat.",
			description: `${date.toTimeString()}, ${date.toLocaleDateString()}`,
		});
		router.refresh();
	}

	return (
		<div className='space-y-3'>
			<span className='text-2xl font-semibold tracking-tight'>
				Thêm cơ sở lưu trữ động vật mới.
			</span>
			<Form {...form}>
				<form
					id='treeEditForm'
					className='space-y-3'
					onSubmit={form.handleSubmit(HandleSubmission)}
				>
					<FormField
						control={form.control}
						name='ten'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tên</FormLabel>
								<FormControl>
									<Input
										placeholder='Cơ sở Lưu Trữ Hoàng Mai'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='maDinhDanhLoaiDongVat'
						render={({ field }) => (
							<FormItem>
								<Select onValueChange={field.onChange}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Chọn một loài động vật' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{pageProps.animals.map((animal) => {
											return (
												<SelectItem
													key={animal.maDinhDanh}
													value={animal.maDinhDanh}
												>
													{animal.ten}
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
						name='maDinhDanhNguoiPhuTrach'
						render={({ field }) => (
							<FormItem>
								<Select onValueChange={field.onChange}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Chọn một người dùng phụ trách' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{pageProps.users.map((user) => {
											return (
												<SelectItem
													key={user.maDinhDanh}
													value={user.maDinhDanh}
												>
													{user.ten} ({user.email})
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
						name='maDinhDanhQuan'
						render={({ field }) => (
							<FormItem>
								<Select onValueChange={field.onChange}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Chọn một quận' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{pageProps.districts.map((dc) => {
											return (
												<SelectItem
													key={dc.maDinhDanh}
													value={dc.maDinhDanh}
												>
													{dc.ten}
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
			<div className='flex items-center justify-end gap-3'>
				<Button type='submit' form='treeEditForm'>
					Thêm
				</Button>
			</div>
		</div>
	);
}
