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
import { ThanhPho } from "@/lib/schema";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

type pageProps = {
	city: ThanhPho;
};

const citySchema = z.object({
	name: z.string().min(1, {
		message: "Phải điền tên thành phố.",
	}),
});

export default function CityEditForm(pageProps: pageProps) {
	const { toast } = useToast();
	const router = useRouter();

	const form = useForm<z.infer<typeof citySchema>>({
		resolver: zodResolver(citySchema),
		defaultValues: {
			name: pageProps.city.ten,
		},
	});
	async function deleteData() {
		const response = await fetch(
			`/api/database/cities/${pageProps.city.maDinhDanh}`,
			{
				method: "DELETE",
			}
		);
		if (!response.ok) {
			toast({ title: "Không xóa được thành phố." });
			return;
		}
		toast({ title: "Đã xóa thành phố." });
	}

	async function handleSubmission(values: z.infer<typeof citySchema>) {
		console.log(values);
		const response = await fetch(
			`/api/database/cities/${pageProps.city.maDinhDanh}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					ten: values.name,
				}),
			}
		);
		const date = new Date(Date.now());

		if (!response.ok) {
			toast({
				variant: "destructive",
				title: "Không cập nhật được thành phố.",
				description: `${date.toTimeString()}, ${date.toLocaleDateString()}`,
			});
			return;
		}
		toast({
			title: "Đã cập nhật thành phố.",
			description: `${date.toTimeString()}, ${date.toLocaleDateString()}`,
		});
		router.refresh();
	}

	return (
		<div className='space-y-3'>
			<span className='text-2xl font-semibold tracking-tight'>
				Cập nhật thành phố.
			</span>
			<Form {...form}>
				<form
					id='cityEditForm'
					className='space-y-3'
					onSubmit={form.handleSubmit(handleSubmission)}
				>
					<Label>UUID</Label>
					<Input disabled placeholder={pageProps.city.maDinhDanh} />
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tên</FormLabel>
								<FormControl>
									<Input placeholder='Hanoi' {...field} />
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

				<Button type='submit' form='cityEditForm'>
					Cập nhật
				</Button>
			</div>
		</div>
	);
}
