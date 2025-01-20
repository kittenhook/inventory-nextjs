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
import { Role, User } from "@/lib/schema";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

type pageProps = {
	user: User;
	roles: Role[];
};

const userLoginSchema = z.object({
	ten: z.string().min(1, {
		message: "Phải điền tên người dùng.",
	}),
	email: z.string().email({
		message: "Phải điền email người dùng.",
	}),
	maDinhDanhQuyen: z.string().min(1, {
		message: "Phải chọn quyền hợp lệ.",
	}),
});

export default function UserEditForm(pageProps: pageProps) {
	const { toast } = useToast();
	const router = useRouter();

	const form = useForm<z.infer<typeof userLoginSchema>>({
		resolver: zodResolver(userLoginSchema),
		defaultValues: {
			ten: pageProps.user.ten,
			email: pageProps.user.email,
			maDinhDanhQuyen: pageProps.user.maDinhDanhQuyen || "",
		},
	});
	async function deleteData() {
		const response = await fetch(
			`/api/database/users/${pageProps.user.maDinhDanh}`,
			{
				method: "DELETE",
			}
		);
		if (!response.ok) {
			toast({ title: "Không xóa được người dùng." });
			return;
		}
		toast({ title: "Đã xóa người dùng." });
	}

	async function handleSubmission(values: z.infer<typeof userLoginSchema>) {
		console.log(values);
		const response = await fetch(
			`/api/database/users/${pageProps.user.maDinhDanh}`,
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
				title: "Không cập nhật được người dùng.",
				description: `${date.toTimeString()}, ${date.toLocaleDateString()}`,
			});
			return;
		}
		toast({
			title: "Đã cập nhật người dùng.",
			description: `${date.toTimeString()}, ${date.toLocaleDateString()}`,
		});
		router.refresh();
	}

	return (
		<div className='space-y-3'>
			<span className='text-2xl font-semibold tracking-tight'>
				Cập nhật người dùng.
			</span>
			<Form {...form}>
				<form
					id='treeEditForm'
					className='space-y-3'
					onSubmit={form.handleSubmit(handleSubmission)}
				>
					<Label>UUID</Label>
					<Input disabled placeholder={pageProps.user.maDinhDanh} />
					<FormField
						control={form.control}
						name='ten'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tên</FormLabel>
								<FormControl>
									<Input
										placeholder='Hồ Minh Duy'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type='email'
										placeholder='hmd@kittenhook.xyz'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='maDinhDanhQuyen'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Quyền</FormLabel>
								<Select
									defaultValue={
										pageProps.user.maDinhDanhQuyen || ""
									}
									onValueChange={field.onChange}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{pageProps.roles.map((role) => {
											return (
												<SelectItem
													key={role.maDinhDanh}
													value={role.maDinhDanh}
												>
													{role.ten}
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
				<Button type='submit' form='treeEditForm'>
					Update
				</Button>
			</div>
		</div>
	);
}
