import { createCity, createDistrict } from "@/lib/dbInteractions";
import { newQuan } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const body: newQuan = await req.json();
	const createdDistrict = await createDistrict({ ...body });
	if (!createdDistrict) return new NextResponse(null, { status: 400 });
	return NextResponse.json(createdDistrict);
}
