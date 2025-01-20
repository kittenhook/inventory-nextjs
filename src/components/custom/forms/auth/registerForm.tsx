"use client";
import * as React from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

const userLoginSchema = z.object({
	name: z.string().min(1, {
		message: "A name must be provided.",
	}),
	email: z
		.string()
		.email({
			message: "A valid email must be provided.",
		})
		.toLowerCase(),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters.",
	}),
});

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../../AuthContext";

export default function RegisterForm() {
	const { signUp } = useAuth();
	const form = useForm<z.infer<typeof userLoginSchema>>({
		resolver: zodResolver(userLoginSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	return (
		<div className='space-y-3'>
			<span className='text-2xl font-semibold tracking-tight'>
				Sign up for an account
			</span>
			<Form {...form}>
				<form
					id='registerForm'
					onSubmit={form.handleSubmit(signUp)}
					className='space-y-3'
				>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										placeholder='Nguyen Huy'
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
										placeholder='itsngh@kittenhook.xyz'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type='password'
										placeholder=''
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
			<div className='flex justify-end items-center gap-3'>
				<Button type='submit' form='registerForm'>
					Sign up
				</Button>
			</div>
		</div>
	);
}
