import { NextRequest, NextResponse } from "next/server";
import { createUser, createUserSession } from "@/lib/userInteractions";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
	try {
		const { name, email, password } = await req.json();
		if (!name || !email || !password) {
			return NextResponse.json(
				{ message: "empty field" },
				{ status: 400 }
			);
		}
		const user = await createUser(name, email, password);
		const session = await createUserSession({
			maDinhDanhNguoiDung: user.maDinhDanh,
		});

		(await cookies()).set("session", session.token, {
			httpOnly: true,
			maxAge: Math.floor(session.expiresAt.valueOf() / 1000),
			sameSite: "strict",
			path: "/",
		});
		return NextResponse.json(user, { status: 200 });
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{ message: "server side error" },
			{ status: 500 }
		);
	}
}
