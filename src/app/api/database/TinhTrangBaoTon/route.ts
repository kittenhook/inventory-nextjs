import { retrieveAllTinhTrangBaoTon } from "@/lib/dbInteractions";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const ttbt = await retrieveAllTinhTrangBaoTon();
		return NextResponse.json(ttbt, { status: 200 });
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
