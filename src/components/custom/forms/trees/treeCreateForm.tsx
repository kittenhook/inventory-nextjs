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
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const newTreeSchema = z.object({
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

export default function TreeCreateForm() {
	const { toast } = useToast();
	const router = useRouter();
	const form = useForm<z.infer<typeof newTreeSchema>>({
		resolver: zodResolver(newTreeSchema),
		defaultValues: {
			ten: "",
			moiTruong: "",
			nangSuat: 0,
			tacDongMoiTruong: "",
		},
	});
	async function HandleSubmission(values: z.infer<typeof newTreeSchema>) {
		const response = await fetch(`/api/database/trees/new`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...values }),
		});
		const date = new Date(Date.now());

		if (!response.ok) {
			toast({
				variant: "destructive",
				title: "Không thêm được giống cây trồng.",
				description: `${date.toTimeString()}, ${date.toLocaleDateString()}`,
			});
			return;
		}
		toast({
			title: "Đã thêm giống cây trồng.",
			description: `${date.toTimeString()}, ${date.toLocaleDateString()}`,
		});
		router.refresh();
	}

	return (
		<div className='space-y-3'>
			<span className='text-2xl font-semibold tracking-tight'>
				Thêm giống cây trồng mới.
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
				<Button type='submit' form='treeEditForm'>
					Thêm
				</Button>
			</div>
		</div>
	);
}
