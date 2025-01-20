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

const newCitySchema = z.object({
	ten: z.string().min(1, {
		message: "Phải điền tên thành phố.",
	}),
});

export default function CityCreateForm() {
	const { toast } = useToast();
	const router = useRouter();
	const form = useForm<z.infer<typeof newCitySchema>>({
		resolver: zodResolver(newCitySchema),
		defaultValues: {
			ten: "",
		},
	});
	async function HandleSubmission(values: z.infer<typeof newCitySchema>) {
		const response = await fetch(`/api/database/cities/new`, {
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
				title: "Không thêm được thành phố.",
				description: `${date.toTimeString()}, ${date.toLocaleDateString()}`,
			});
			return;
		}
		toast({
			title: "Đã thêm thành phố.",
			description: `${date.toTimeString()}, ${date.toLocaleDateString()}`,
		});
		router.refresh();
	}

	return (
		<div className='space-y-3'>
			<span className='text-2xl font-semibold tracking-tight'>
				Thêm thành phố mới.
			</span>
			<Form {...form}>
				<form
					id='cityEditForm'
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
									<Input placeholder='Hanoi' {...field} />
								</FormControl>
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
