"use client";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const newTreeSchema = z.object({
	ten: z.string().min(1, {
		message: "Phải điền tên quyền.",
	}),
	isPrivileged: z.boolean(),
});

export default function RoleCreateForm() {
	const { toast } = useToast();
	const router = useRouter();
	const form = useForm<z.infer<typeof newTreeSchema>>({
		resolver: zodResolver(newTreeSchema),
		defaultValues: {
			ten: "",
			isPrivileged: false,
		},
	});
	async function HandleSubmission(values: z.infer<typeof newTreeSchema>) {
		const response = await fetch(`/api/database/roles/new`, {
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
				title: "Không thêm được quyền.",
				description: `${date.toTimeString()}, ${date.toLocaleDateString()}`,
			});
			return;
		}
		toast({
			title: "Đã thêm quyền.",
			description: `${date.toTimeString()}, ${date.toLocaleDateString()}`,
		});
		router.refresh();
	}

	return (
		<div className='space-y-3'>
			<span className='text-2xl font-semibold tracking-tight'>
				Thêm quyền mới.
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
									<Input
										placeholder='Quản trị viên'
										{...field}
									/>
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
				<Button type='submit' form='treeEditForm'>
					Thêm
				</Button>
			</div>
		</div>
	);
}
