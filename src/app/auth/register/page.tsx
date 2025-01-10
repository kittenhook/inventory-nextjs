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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Role } from "@/lib/schema";

export default function CardWithForm() {
	const [name, setName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [role, setRole] = React.useState("");

	const [rolesData, setRolesData] = React.useState<Role[]>([]);

	React.useEffect(() => {
		async function getRoles() {
			const responseData: Role[] = await (
				await fetch("http://localhost:3000/api/database/Quyen")
			).json();
			setRolesData(responseData);
		}
		getRoles();
	}, []);

	function handleValueChange(value: string) {
		setRole(value);
	}

	async function handleSubmission() {
		const response = await fetch("/api/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: name,
				email: email,
				password: password,
				role: role,
			}),
		});

		const responseData = await response.json();
		if (!response.ok) {
			alert("register failed");
			return;
		}
		alert("registered successfully");
		console.log(responseData);
	}

	return (
		<div className='flex w-screen h-screen justify-center items-center'>
			<Card className='w-[350px] h-fit'>
				<CardHeader>
					<CardTitle>Register an account</CardTitle>
				</CardHeader>
				<CardContent>
					<form>
						<div className='grid w-full items-center gap-4'>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='name'>Name</Label>
								<Input
									id='name'
									placeholder='Nguyen Huy'
									onChange={(e) => {
										setName(e.target.value);
									}}
								/>
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									placeholder='itsngh@kittenhook.xyz'
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='password'>Password</Label>
								<Input
									type='password'
									id='password'
									onChange={(e) => {
										setPassword(e.target.value);
									}}
								/>
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='role'>Role</Label>
								<Select
									defaultValue='member'
									onValueChange={handleValueChange}
								>
									<SelectTrigger id='role'>
										<SelectValue placeholder='Select' />
									</SelectTrigger>
									<SelectContent position='popper'>
										{rolesData.map((e) => {
											return (
												<SelectItem
													key={e.maDinhDanh}
													value={e.maDinhDanh}
												>
													{e.ten}
												</SelectItem>
											);
										})}
									</SelectContent>
								</Select>
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className='flex justify-end'>
					<Button onClick={handleSubmission}>Register</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
