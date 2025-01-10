"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const newAnimalSchema = z.object({
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
	const form = useForm<z.infer<typeof newAnimalSchema>>({
		resolver: zodResolver(newAnimalSchema),
		defaultValues: {
			ten: "",
		},
	});

	async function onSubmit(values: z.infer<typeof newAnimalSchema>) {
		const response = await fetch("/api/database/loaiGiong/Cay/new", {
			method: "POST",
			body: JSON.stringify(values),
		});
		if (!response.ok) {
			alert("failed to add new tree");
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
