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
import { ThanhPho } from "@/lib/schema";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type pageProps = {
	cities: ThanhPho[];
};

const newDistrictSchema = z.object({
	ten: z.string().min(1, {
		message: "Phải điền tên quận.",
	}),
	maDinhDanhThanhPho: z.string().min(1, {
		message: "Phải chọn một thành phố hợp lệ.",
	}),
});

export default function DistrictCreateForm(pageProps: pageProps) {
	const { toast } = useToast();
	const router = useRouter();

	const form = useForm<z.infer<typeof newDistrictSchema>>({
		resolver: zodResolver(newDistrictSchema),
		defaultValues: {
			ten: "",
			maDinhDanhThanhPho: "",
		},
	});
	async function handleSubmission(values: z.infer<typeof newDistrictSchema>) {
		console.log(values);
		const response = await fetch(`/api/database/districts/new`, {
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
				title: "Không thêm được quận.",
				description: `${date.toTimeString()}, ${date.toLocaleDateString()}`,
			});
			return;
		}
		toast({
			title: "Đã thêm quận.",
			description: `${date.toTimeString()}, ${date.toLocaleDateString()}`,
		});
		router.refresh();
	}

	return (
		<div className='space-y-3'>
			<span className='text-2xl font-semibold tracking-tight'>
				Thêm quận mới.
			</span>
			<Form {...form}>
				<form
					id='cityEditForm'
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
									<Input placeholder='Hoàn Kiếm' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='maDinhDanhThanhPho'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Thành phố</FormLabel>

								<Select onValueChange={field.onChange}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Chọn một thành phố' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{pageProps.cities.map((city) => {
											return (
												<SelectItem
													key={city.maDinhDanh}
													value={city.maDinhDanh}
												>
													{city.ten}
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
				<Button type='submit' form='cityEditForm'>
					Thêm
				</Button>
			</div>
		</div>
	);
}
