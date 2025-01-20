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
import {
	HinhThucSanXuat,
	LoaiGiong,
	LoaiHinhSanXuat,
	Quan,
	User,
} from "@/lib/schema";

const newTreeSchema = z.object({
	ten: z.string().min(1, {
		message: "A name must be provided",
	}),
	congSuat: z.preprocess(
		(a) => parseInt(z.string().parse(a), 10),
		z.number()
	),
	maDinhDanhLoaiGiong: z.string().min(1),
	maDinhDanhNguoiPhuTrach: z.string().min(1),
	maDinhDanhQuan: z.string().min(1),
	maDinhDanhHinhThucSanXuat: z.string().min(1),
	maDinhDanhLoaiHinhSanXuat: z.string().min(1),
});

type pageProps = {
	districts: Quan[];
	users: User[];
	trees: LoaiGiong[];
	htsx: HinhThucSanXuat[];
	lhsx: LoaiHinhSanXuat[];
};

export default function TreeFacCreateForm(pageProps: pageProps) {
	const { toast } = useToast();
	const router = useRouter();
	const form = useForm<z.infer<typeof newTreeSchema>>({
		resolver: zodResolver(newTreeSchema),
		defaultValues: {
			ten: "",
			congSuat: 0,
			maDinhDanhLoaiGiong: "",
			maDinhDanhNguoiPhuTrach: "",
			maDinhDanhQuan: "",
			maDinhDanhHinhThucSanXuat: "",
			maDinhDanhLoaiHinhSanXuat: "",
		},
	});
	async function handleSubmission(values: z.infer<typeof newTreeSchema>) {
		const response = await fetch(`/api/database/coSo/Cay/new`, {
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
				Tao co so san xuat cay trong moi.
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
								<FormLabel>Ten</FormLabel>
								<FormControl>
									<Input placeholder='Name' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='congSuat'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Cong Suat</FormLabel>
								<FormControl>
									<Input
										type='number'
										placeholder='Cong Suat'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='maDinhDanhLoaiGiong'
						render={({ field }) => (
							<FormItem>
								<Select onValueChange={field.onChange}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Chon mot loai dong vat' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{pageProps.trees.map((tree) => {
											return (
												<SelectItem
													key={tree.maDinhDanh}
													value={tree.maDinhDanh}
												>
													{tree.ten}
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
											<SelectValue placeholder='Chon mot nguoi phu trach' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{pageProps.users.map((user) => {
											return (
												<SelectItem
													key={user.maDinhDanh}
													value={user.maDinhDanh}
												>
													{user.ten}
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
											<SelectValue placeholder='Chon mot quan' />
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
					<FormField
						control={form.control}
						name='maDinhDanhHinhThucSanXuat'
						render={({ field }) => (
							<FormItem>
								<Select onValueChange={field.onChange}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Chon mot htsx' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{pageProps.htsx.map((htsx) => {
											return (
												<SelectItem
													key={htsx.maDinhDanh}
													value={htsx.maDinhDanh}
												>
													{htsx.ten}
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
						name='maDinhDanhLoaiHinhSanXuat'
						render={({ field }) => (
							<FormItem>
								<Select onValueChange={field.onChange}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Chon mot lhsx' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{pageProps.lhsx.map((lhsx) => {
											return (
												<SelectItem
													key={lhsx.maDinhDanh}
													value={lhsx.maDinhDanh}
												>
													{lhsx.ten}
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
					Them
				</Button>
			</div>
		</div>
	);
}
