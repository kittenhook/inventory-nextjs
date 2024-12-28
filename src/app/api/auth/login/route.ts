import { createUserSession, retrieveUsersKey } from "@/lib/userInteractions";
import { NextRequest, NextResponse } from "next/server";
import { verify } from "argon2";

export async function POST(req: NextRequest) {
	try {
		const { email, password } = await req.json();
		const user = await retrieveUsersKey(email);
		console.log(user);
		if (!(await verify(user.key.matKhau, password))) {
			return NextResponse.json(
				{ message: "wrong password" },
				{ status: 401 }
			);
		}
		const token = await createUserSession(user.uuid);
		return NextResponse.json(
			{
				message: "correct password",
				token: token,
			},
			{ status: 200 }
		);
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{ message: "server side error" },
			{ status: 500 }
		);
	}
}
