"use client";
import * as React from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { Role, User } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
const userSchema = z.object({
	maDinhDanh: z.string().uuid(),
	ten: z.string(),
	email: z.string().email(),
	maDinhDanhQuyen: z.string().uuid(),
});

type pageProps = {
	user: User;
	roles: Role[];
};

export default function UserEditForm(props: pageProps) {
	const { user, roles } = props;
	const form = useForm<z.infer<typeof userSchema>>({
		resolver: zodResolver(userSchema),
		defaultValues: {
			maDinhDanh: user.maDinhDanh,
			ten: user.ten,
			email: user.email,
			maDinhDanhQuyen: user.maDinhDanhQuyen || "",
		},
	});

	async function onSubmit(values: z.infer<typeof userSchema>) {
		const response = await fetch(
			`/api/database/nguoiDung/${user.maDinhDanh}`,
			{
				method: "PATCH",
				body: JSON.stringify(values),
			}
		);
		if (!response.ok) {
			alert("failed to update user");
			return;
		}
		alert("added successfully");
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>User page</CardTitle>
				<CardDescription>Card Description</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name='ten'
							render={({ field }) => (
								<FormItem>
									<FormLabel></FormLabel>
									<FormControl>
										<Input
											placeholder='Nguyen Huy'
											{...field}
										/>
									</FormControl>
									<FormDescription></FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel></FormLabel>
									<FormControl>
										<Input
											placeholder='itsngh@kittenhook.xyz'
											{...field}
										/>
									</FormControl>
									<FormDescription></FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='maDinhDanhQuyen'
							render={({ field }) => (
								<FormItem>
									<FormLabel></FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={
											user.maDinhDanhQuyen || ""
										}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{roles.map((role) => {
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
									<FormDescription></FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='flex w-fill justify-end'>
							<Button type='submit'>Update</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
