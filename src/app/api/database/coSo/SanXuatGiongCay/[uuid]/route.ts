import { retrieveTreeFactory } from "@/lib/dbInteractions";
import { NextRequest, NextResponse } from "next/server";

type Parameters = {
	uuid: string;
};

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<Parameters> }
) {
	const uuid = (await params).uuid;
	const animalFactory = await retrieveTreeFactory({ maDinhDanh: uuid });
	if (!animalFactory) return NextResponse.json({}, { status: 404 });
	return NextResponse.json(animalFactory);
}
