import { retrieveAllUserRoles } from "@/lib/userInteractions";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const roles = await retrieveAllUserRoles();
		if (!roles) return new NextResponse(null, { status: 404 });
		return NextResponse.json(roles);
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{ message: "There was a problem fetching roles!" },
			{ status: 500 }
		);
	}
}
