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
import { LoaiBienDong, TinhTrangBaoTon } from "@/lib/schema";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
type pageProps = {
	lbd: LoaiBienDong[];
	ttbt: TinhTrangBaoTon[];
};

const newAnimalSchema = z.object({
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

export default function TreeCreateForm(pageProps: pageProps) {
	const { toast } = useToast();
	const router = useRouter();
	const form = useForm<z.infer<typeof newAnimalSchema>>({
		resolver: zodResolver(newAnimalSchema),
		defaultValues: {
			ten: "",
			moiTruongSong: "",
			viTriPhanBo: "",
			maDinhDanhLoaiBienDong: "",
			maDinhDanhTinhTrangBaoTon: "",
		},
	});
	async function handleSubmission(values: z.infer<typeof newAnimalSchema>) {
		const response = await fetch(`/api/database/trees/new`, {
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
				title: "Failed to create animal.",
				description: `${date.toTimeString()}, ${date.toLocaleDateString()}`,
			});
			return;
		}
		toast({
			title: "Created animal.",
			description: `${date.toTimeString()}, ${date.toLocaleDateString()}`,
		});
		router.refresh();
	}

	return (
		<div className='space-y-3'>
			<span className='text-2xl font-semibold tracking-tight'>
				Create new tree.
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
										{pageProps.lbd.map((lbd) => {
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
								<FormLabel>Tinh trang bao ton</FormLabel>
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
										{pageProps.ttbt.map((ttbt) => {
											return (
												<SelectItem
													key={ttbt.maDinhDanh}
													value={ttbt.maDinhDanh}
												>
													{ttbt.ten}
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
					Create
				</Button>
			</div>
		</div>
	);
}
