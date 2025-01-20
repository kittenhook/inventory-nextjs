import { NextRequest, NextResponse } from "next/server";
import { Role, roles } from "@/lib/schema";
import { updateUserRole } from "@/lib/userInteractions";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ uuid: string }> }
) {
	const uuid = (await params).uuid;
	const body: Omit<Role, "maDinhDanh"> = await req.json();
	const updatedRole = await updateUserRole({
		maDinhDanh: uuid,
		...body,
	});
	if (!updatedRole) return new NextResponse(null, { status: 400 });
	return NextResponse.json(updatedRole);
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ uuid: string }> }
) {
	const uuid = (await params).uuid;
	console.log(uuid);
	if (!uuid) return new NextResponse(null, { status: 400 });
	const [deletedRole] = await db
		.delete(roles)
		.where(eq(roles.maDinhDanh, uuid))
		.returning();
	if (!deletedRole) return new NextResponse(null, { status: 500 });
	return new NextResponse(null);
}
