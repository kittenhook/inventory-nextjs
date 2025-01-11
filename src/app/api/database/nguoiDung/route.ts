import { retrieveAllUsers } from "@/lib/userInteractions";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const users = await retrieveAllUsers();
		if (!users)
			return NextResponse.json(
				{ message: "No user found." },
				{ status: 404 }
			);
		return NextResponse.json(users, { status: 200 });
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{ message: "server-side error." },
			{ status: 500 }
		);
	}
}
