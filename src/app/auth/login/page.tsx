"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	async function handleSubmission() {
		const response = await fetch("/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		});
		const responseData = await response.json();

		if (!response.ok) {
			console.log(responseData);
			alert("invalid password");
			return;
		}
		alert("correct!");
	}

	return (
		<div className='flex w-screen h-screen justify-center items-center'>
			<Card className='w-[350px] h-fit'>
				<CardHeader>
					<CardTitle>Log into an existing account</CardTitle>
				</CardHeader>
				<CardContent>
					<form>
						<div className='grid w-full items-center gap-4'>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									placeholder='itsngh@kittenhook.xyz'
									onChange={(e) => {
										setEmail(e.target.value);
									}}
								/>
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='password'>Password</Label>
								<Input
									type='password'
									id='password'
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className='flex justify-end gap-3'>
					<Link href='/auth/register' className='text-sm'>
						Do not have an account?
					</Link>
					<Button onClick={handleSubmission}>Login</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
