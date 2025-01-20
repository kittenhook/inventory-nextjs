import { retrieveAllAnimalFactories } from "@/lib/dbInteractions";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	const facilities = await retrieveAllAnimalFactories();
	if (!facilities) return new NextResponse(null, { status: 404 });
	return NextResponse.json(facilities);
}
