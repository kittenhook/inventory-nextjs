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
import { Quan, ThanhPho } from "@/lib/schema";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

type pageProps = {
	district: Quan;
	cities: ThanhPho[];
};

const citySchema = z.object({
	ten: z.string().min(1, {
		message: "A name must be provided",
	}),
	maDinhDanhThanhPho: z.string().min(1, {
		message: "A valid city must be provided.",
	}),
});

export default function DistrictEditForm(pageProps: pageProps) {
	const { toast } = useToast();
	const router = useRouter();

	const form = useForm<z.infer<typeof citySchema>>({
		resolver: zodResolver(citySchema),
		defaultValues: {
			ten: pageProps.district.ten,
			maDinhDanhThanhPho: pageProps.district.maDinhDanhThanhPho,
		},
	});
	async function deleteData() {
		const response = await fetch(
			`/api/database/districts/${pageProps.district.maDinhDanh}`,
			{
				method: "DELETE",
			}
		);
		if (!response.ok) {
			toast({ title: "khong xoa duoc quan." });
			return;
		}
		toast({ title: "da xoa quan." });
	}

	async function handleSubmission(values: z.infer<typeof citySchema>) {
		console.log(values);
		const response = await fetch(
			`/api/database/districts/${pageProps.district.maDinhDanh}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...values,
				}),
			}
		);
		const date = new Date(Date.now());

		if (!response.ok) {
			toast({
				variant: "destructive",
				title: "Failed to update district's data.",
				description: `${date.toTimeString()}, ${date.toLocaleDateString()}`,
			});
			return;
		}
		toast({
			title: "Updated district's data.",
			description: `${date.toTimeString()}, ${date.toLocaleDateString()}`,
		});
		router.refresh();
	}

	return (
		<div className='space-y-3'>
			<span className='text-2xl font-semibold tracking-tight'>
				Update a district.
			</span>
			<Form {...form}>
				<form
					id='cityEditForm'
					className='space-y-3'
					onSubmit={form.handleSubmit(handleSubmission)}
				>
					<Label>UUID</Label>
					<Input
						disabled
						placeholder={pageProps.district.maDinhDanh}
					/>
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
						name='maDinhDanhThanhPho'
						render={({ field }) => (
							<FormItem>
								<FormLabel>City</FormLabel>

								<Select
									onValueChange={field.onChange}
									defaultValue={
										pageProps.district.maDinhDanhThanhPho
									}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue />
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
				<Button variant='destructive' onClick={deleteData}>
					Delete
				</Button>
				<Button type='submit' form='cityEditForm'>
					Update
				</Button>
			</div>
		</div>
	);
}
