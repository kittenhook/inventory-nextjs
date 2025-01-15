import { cookies } from "next/headers";
import { createUserSession, retrieveUsersKey } from "@/lib/userInteractions";
import { NextRequest, NextResponse } from "next/server";
import { verify } from "argon2";

export async function POST(req: NextRequest) {
	try {
		const { email, password } = await req.json();
		const userkey = await retrieveUsersKey({ email: email });
		if (!userkey)
			return NextResponse.json(
				{ message: "No user found." },
				{ status: 404 }
			);
		if (!(await verify(userkey.key.matKhau, password))) {
			return NextResponse.json(
				{ message: "wrong password" },
				{ status: 401 }
			);
		}
		const session = await createUserSession({
			maDinhDanhNguoiDung: userkey.user.maDinhDanh,
		});

		(await cookies()).set("session", session.token, {
			httpOnly: true,
			maxAge: Math.floor(session.expiresAt.valueOf() / 1000),
			sameSite: "strict",
			path: "/",
		});

		return NextResponse.json(userkey.user, { status: 200 });
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{ message: "server side error" },
			{ status: 500 }
		);
	}
}
