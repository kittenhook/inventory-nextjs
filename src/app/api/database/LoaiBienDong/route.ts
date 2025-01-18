import { retrieveAllLoaiBienDong } from "@/lib/dbInteractions";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const lbd = await retrieveAllLoaiBienDong();
		return NextResponse.json(lbd, { status: 200 });
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{ message: "server-side error" },
			{
				status: 500,
			}
		);
	}
}
