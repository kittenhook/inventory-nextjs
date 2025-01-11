import { retrieveAllAnimalFactories } from "@/lib/dbInteractions";
import { NextResponse } from "next/server";

export async function GET() {
	const factories = await retrieveAllAnimalFactories();
	if (!factories) return NextResponse.json([], { status: 404 });
	return NextResponse.json(factories);
}
