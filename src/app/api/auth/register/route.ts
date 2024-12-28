import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/lib/userInteractions";

export async function POST(req: NextRequest) {
	try {
		const { name, email, password, role } = await req.json();
		if (!name || !email || !password) {
			return NextResponse.json(
				{ message: "empty field" },
				{ status: 400 }
			);
		}
		const user = await createUser(name, email, password, role || "member");
		return NextResponse.json({ uuid: user.uuid }, { status: 200 });
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{ message: "server side error" },
			{ status: 500 }
		);
	}
}
