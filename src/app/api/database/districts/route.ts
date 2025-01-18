import { retrieveAllDistricts } from "@/lib/dbInteractions";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const districts = await retrieveAllDistricts();
		if (!districts) return new NextResponse(null, { status: 404 });
		return NextResponse.json(districts);
	} catch {
		return NextResponse.json(
			{
				message: "server-side error",
			},
			{
				status: 500,
			}
		);
	}
}
