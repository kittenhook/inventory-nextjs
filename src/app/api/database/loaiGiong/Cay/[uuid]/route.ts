import { updateTree } from "@/lib/dbInteractions";
import { newLoaiGiong } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ uuid: string }> }
) {
	const uuid = (await params).uuid;
	const body = await request.json();
	const updatedTreeBody: newLoaiGiong = {
		maDinhDanh: uuid,
		ten: body.ten,
	};
	const updatedTree = await updateTree(updatedTreeBody);
	if (!updateTree)
		return new NextResponse(null, {
			status: 500,
		});
	console.log(updatedTree);
	return NextResponse.json(updatedTree);
}
