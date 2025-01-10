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
		const sessionObject = await createUserSession({
			maDinhDanhNguoiDung: userkey.user.maDinhDanh,
		});
		const cookieData = {
			user: userkey.user,
			session: sessionObject,
		};

		(await cookies()).set("sessionObject", JSON.stringify(cookieData), {
			httpOnly: true,
			maxAge: 60 * 60 * 5,
			sameSite: "strict",
			path: "/",
		});

		return NextResponse.json(
			{ message: "Login successful" },
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
