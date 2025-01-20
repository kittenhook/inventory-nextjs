import { createCity } from "@/lib/dbInteractions";
import { newThanhPho } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const body: newThanhPho = await req.json();
	const createdCity = await createCity({ ...body });
	if (!createdCity) return new NextResponse(null, { status: 400 });
	return NextResponse.json(createdCity);
}
