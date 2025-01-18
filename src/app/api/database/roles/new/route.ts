import { createUserRole } from "@/lib/userInteractions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const { ten } = await req.json();
		if (!ten)
			return NextResponse.json(
				{ message: "empty field detected" },
				{ status: 400 }
			);
		const newRole = await createUserRole({ ten: ten });
		return NextResponse.json(newRole, { status: 200 });
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{ message: "There was a problem creating this role." },
			{ status: 500 }
		);
	}
}
