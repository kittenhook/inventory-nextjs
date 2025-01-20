"use client";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaiGiong } from "@/lib/schema";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type pageProps = {
	tree: LoaiGiong;
};

const treeSchema = z.object({
	ten: z.string().min(1, {
		message: "Phải điền tên giống cây trồng.",
	}),
	moiTruong: z
		.string()
		.min(1, { message: "Phải điền môi trường của giống cây trồng." }),
	nangSuat: z.preprocess(
		(a) => parseInt(z.string().parse(a), 10),
		z.number()
	),
	tacDongMoiTruong: z.string().min(1, {
		message: "Phải điền tác động môi trường của giống cây trồng.",
	}),
});

export default function TreeEditForm(pageProps: pageProps) {
	const { toast } = useToast();
	const router = useRouter();

	const form = useForm<z.infer<typeof treeSchema>>({
		resolver: zodResolver(treeSchema),
		defaultValues: {
			ten: pageProps.tree.ten,
			moiTruong: pageProps.tree.moiTruong,
			nangSuat: pageProps.tree.nangSuat,
			tacDongMoiTruong: pageProps.tree.tacDongMoiTruong,
		},
	});

	async function deleteData() {
		const response = await fetch(
			`/api/database/trees/${pageProps.tree.maDinhDanh}`,
			{
				method: "DELETE",
			}
		);
		if (!response.ok) {
			toast({ title: "Không xóa được giống cây trồng" });
			return;
		}
		toast({ title: "Đã xóa giống cây trồng." });
	}
	async function handleSubmission(values: z.infer<typeof treeSchema>) {
		console.log(values);
		const response = await fetch(
			`/api/database/trees/${pageProps.tree.maDinhDanh}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					ten: values.ten,
				}),
			}
		);
		const date = new Date(Date.now());

		if (!response.ok) {
			toast({
				variant: "destructive",
				title: "Không cập nhật được giống cây trồng.",
				description: `${date.toTimeString()}, ${date.toLocaleDateString()}`,
			});
			return;
		}
		toast({
			title: "Đã cập nhật giống cây trồng.",
			description: `${date.toTimeString()}, ${date.toLocaleDateString()}`,
		});
		router.refresh();
	}

	return (
		<div className='space-y-3'>
			<span className='text-2xl font-semibold tracking-tight'>
				Cập nhật giống cây trồng.
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
									<Input placeholder='Cây bàng' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='moiTruong'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Môi trường</FormLabel>
								<FormControl>
									<Input placeholder='Rừng' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='nangSuat'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Năng suất (kg/m^2)</FormLabel>
								<FormControl>
									<Input
										type='number'
										placeholder='30'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='tacDongMoiTruong'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tác động môi trường</FormLabel>
								<FormControl>
									<Input
										placeholder='Thải ra khí CO2, ...'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
			<div className='flex items-center justify-end gap-3'>
				<Button variant='destructive' onClick={deleteData}>
					Xóa
				</Button>

				<Button type='submit' form='treeEditForm'>
					Cập nhật
				</Button>
			</div>
		</div>
	);
}
