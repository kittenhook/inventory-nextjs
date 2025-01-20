import { db } from "@/lib/db";
import { updateTree } from "@/lib/dbInteractions";
import { loaiGiong, newLoaiGiong } from "@/lib/schema";
import { eq } from "drizzle-orm";
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
	if (!updatedTree)
		return new NextResponse(null, {
			status: 500,
		});
	console.log(updatedTree);
	return NextResponse.json(updatedTree);
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ uuid: string }> }
) {
	const uuid = (await params).uuid;
	if (!uuid) return new NextResponse(null, { status: 400 });
	const [deletedRole] = await db
		.delete(loaiGiong)
		.where(eq(loaiGiong.maDinhDanh, uuid))
		.returning();
	if (!deletedRole) return new NextResponse(null, { status: 500 });
	return new NextResponse(null);
}
