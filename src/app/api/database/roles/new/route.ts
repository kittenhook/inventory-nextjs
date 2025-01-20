import { Role } from "@/lib/schema";
import { createUserRole } from "@/lib/userInteractions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const body: Omit<Role, "maDinhDanh"> = await req.json();
		const newRole = await createUserRole({
			maDinhDanh: crypto.randomUUID(),
			...body,
		});
		return NextResponse.json(newRole, { status: 200 });
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{ message: "There was a problem creating this role." },
			{ status: 500 }
		);
	}
}
