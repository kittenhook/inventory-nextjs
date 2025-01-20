import { db } from "@/lib/db";
import { updateAnimal } from "@/lib/dbInteractions";
import { loaiDongVat, LoaiDongVat } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ uuid: string }> }
) {
	const body: LoaiDongVat = await req.json();
	const animalData = { ...body, maDinhDanh: (await params).uuid };
	const updatedAnimal = updateAnimal(animalData);
	if (!updatedAnimal) return new NextResponse(null, { status: 400 });
	return NextResponse.json(updatedAnimal);
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ uuid: string }> }
) {
	const uuid = (await params).uuid;
	if (!uuid) return new NextResponse(null, { status: 400 });
	const [deletedRole] = await db
		.delete(loaiDongVat)
		.where(eq(loaiDongVat.maDinhDanh, uuid))
		.returning();
	if (!deletedRole) return new NextResponse(null, { status: 500 });
	return new NextResponse(null);
}
