import { NextRequest, NextResponse } from "next/server";
import { cities, ThanhPho } from "@/lib/schema";
import { updateCity } from "@/lib/dbInteractions";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ uuid: string }> }
) {
	const uuid = (await params).uuid;
	const body: Omit<ThanhPho, "maDinhDanh"> = await req.json();
	const updatedCity = await updateCity({
		maDinhDanh: uuid,
		...body,
	});
	if (!updatedCity) return new NextResponse(null, { status: 400 });
	return NextResponse.json(updatedCity);
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ uuid: string }> }
) {
	const uuid = (await params).uuid;
	if (!uuid) return new NextResponse(null, { status: 400 });
	const [deletedRole] = await db
		.delete(cities)
		.where(eq(cities.maDinhDanh, uuid))
		.returning();
	if (!deletedRole) return new NextResponse(null, { status: 500 });
	return new NextResponse(null);
}
