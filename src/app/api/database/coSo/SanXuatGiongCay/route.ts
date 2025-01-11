import { retrieveAllTreeFactories } from "@/lib/dbInteractions";
import { NextResponse } from "next/server";

export async function GET() {
	const factories = await retrieveAllTreeFactories();
	if (!factories) return NextResponse.json([], { status: 404 });
	return NextResponse.json(factories);
}
