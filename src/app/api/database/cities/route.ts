import { retrieveAllCities } from "@/lib/dbInteractions";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const cities = await retrieveAllCities();
		if (!cities) return new NextResponse(null, { status: 404 });
		return NextResponse.json(cities);
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
