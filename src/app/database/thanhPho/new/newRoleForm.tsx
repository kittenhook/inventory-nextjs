"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const newRoleSchema = z.object({
	ten: z.string(),
});

import * as React from "react";

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

export default function NewTreeForm() {
	const form = useForm<z.infer<typeof newRoleSchema>>({
		resolver: zodResolver(newRoleSchema),
		defaultValues: {
			ten: "",
		},
	});

	async function onSubmit(values: z.infer<typeof newRoleSchema>) {
		const response = await fetch("/api/database/Quyen/new", {
			method: "POST",
			body: JSON.stringify(values),
		});
		if (!response.ok) {
			alert("failed to add new role");
			return;
		}
		alert("added successfully");
	}

	return (
		<Form {...form}>
			<form className='space-y-3' onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name='ten'
					render={({ field }) => (
						<FormItem>
							<FormLabel></FormLabel>
							<FormControl>
								<Input placeholder='Name' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className='w-[80px]' type='submit'>
					Create
				</Button>
			</form>
		</Form>
	);
}
