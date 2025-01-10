import { retrieveAllUserRoles } from "@/lib/userInteractions";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const roles = await retrieveAllUserRoles();
		console.log(roles);
		return NextResponse.json(roles, { status: 200 });
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{ message: "There was a problem fetching roles!" },
			{ status: 500 }
		);
	}
}
