import { NextRequest, NextResponse } from "next/server";
import { districts, Quan } from "@/lib/schema";
import { updateDistrict } from "@/lib/dbInteractions";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ uuid: string }> }
) {
	const uuid = (await params).uuid;
	const body: Omit<Quan, "maDinhDanh"> = await req.json();
	const updatedDistrict = await updateDistrict({
		maDinhDanh: uuid,
		...body,
	});
	if (!updatedDistrict) return new NextResponse(null, { status: 400 });
	return NextResponse.json(updatedDistrict);
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ uuid: string }> }
) {
	const uuid = (await params).uuid;
	if (!uuid) return new NextResponse(null, { status: 400 });
	const [deletedRole] = await db
		.delete(districts)
		.where(eq(districts.maDinhDanh, uuid))
		.returning();
	if (!deletedRole) return new NextResponse(null, { status: 500 });
	return new NextResponse(null);
}
