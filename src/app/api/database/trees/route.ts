import { retrieveAllTrees } from "@/lib/dbInteractions";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const trees = await retrieveAllTrees();
		if (!trees) return new NextResponse(null, { status: 404 });
		return NextResponse.json(trees, { status: 200 });
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
