import { retrieveAllTreeFactories } from "@/lib/dbInteractions";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	const facilities = await retrieveAllTreeFactories();
	if (!facilities) return new NextResponse(null, { status: 404 });
	return NextResponse.json(facilities);
}
