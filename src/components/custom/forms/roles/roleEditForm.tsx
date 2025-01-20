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
import { Role } from "@/lib/schema";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

type pageProps = {
	role: Role;
};

const roleSchema = z.object({
	ten: z.string().min(1, {
		message: "Phải điền tên quyền.",
	}),
	isPrivileged: z.boolean(),
});

export default function RoleEditForm(pageProps: pageProps) {
	const { toast } = useToast();
	const router = useRouter();

	const form = useForm<z.infer<typeof roleSchema>>({
		resolver: zodResolver(roleSchema),
		defaultValues: {
			ten: pageProps.role.ten,
			isPrivileged: pageProps.role.isPrivileged,
		},
	});

	async function deleteData() {
		const response = await fetch(
			`/api/database/roles/${pageProps.role.maDinhDanh}`,
			{
				method: "DELETE",
			}
		);
		if (!response.ok) {
			toast({ title: "Không xóa được quyền." });
			return;
		}
		toast({ title: "Đã xóa quyền." });
	}

	async function handleSubmission(values: z.infer<typeof roleSchema>) {
		const response = await fetch(
			`/api/database/roles/${pageProps.role.maDinhDanh}`,
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
				title: "Không cập nhật được quyền.",
				description: `${date.toTimeString()}, ${date.toLocaleDateString()}`,
			});
			return;
		}
		toast({
			title: "Đã cập nhật quyền.",
			description: `${date.toTimeString()}, ${date.toLocaleDateString()}`,
		});
		router.refresh();
	}

	return (
		<div className='space-y-3'>
			<span className='text-2xl font-semibold tracking-tight'>
				Cập nhật quyền.
			</span>
			<Form {...form}>
				<form
					id='treeEditForm'
					className='space-y-3'
					onSubmit={form.handleSubmit(handleSubmission)}
				>
					<Label>ID</Label>
					<Input disabled placeholder={pageProps.role.maDinhDanh} />
					<FormField
						control={form.control}
						name='ten'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tên</FormLabel>
								<FormControl>
									<Input placeholder='Ten' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='isPrivileged'
						render={({ field }) => (
							<FormItem className='flex flex-row items-start space-x-2 space-y-0 pt-3'>
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<FormLabel>
									Có khả năng thay đổi website?
								</FormLabel>
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
