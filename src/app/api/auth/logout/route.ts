import { User, Session } from "@/lib/schema";
import { deleteUserSession } from "@/lib/userInteractions";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
	const cookiesStore = await cookies();
	const sessionCookie = cookiesStore.get("session");
	if (!sessionCookie) return new NextResponse(null, { status: 400 });
	try {
		await deleteUserSession({
			token: sessionCookie.value,
		});
		const response = new NextResponse();
		response.cookies.delete("session");
		return response;
	} catch {
		return new NextResponse(null, { status: 500 });
	}
}
