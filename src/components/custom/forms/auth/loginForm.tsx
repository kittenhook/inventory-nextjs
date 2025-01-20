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

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../../AuthContext";

const userLoginSchema = z.object({
	email: z
		.string()
		.email({
			message: "Must be a valid email.",
		})
		.toLowerCase(),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters.",
	}),
});

export default function LoginForm() {
	const { signIn } = useAuth();
	const form = useForm<z.infer<typeof userLoginSchema>>({
		resolver: zodResolver(userLoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	return (
		<div className='space-y-3'>
			<span className='text-2xl font-semibold tracking-tight'>
				Sign into an existing account
			</span>
			<Form {...form}>
				<form
					id='loginForm'
					className='space-y-3'
					onSubmit={form.handleSubmit(signIn)}
				>
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
			<div className='flex items-center justify-end gap-3'>
				<Button type='submit' form='loginForm'>
					Sign in
				</Button>
			</div>
		</div>
	);
}
