import { NextRequest, NextResponse } from "next/server";
import { keys, sessions, User, users } from "@/lib/schema";
import { updateUser } from "@/lib/userInteractions";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ uuid: string }> }
) {
	const uuid = (await params).uuid;
	const body: Omit<User, "maDinhDanh"> = await req.json();
	const updatedRUser = await updateUser({
		maDinhDanh: uuid,
		...body,
	});
	if (!updatedRUser) return new NextResponse(null, { status: 400 });
	return NextResponse.json(updatedRUser);
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ uuid: string }> }
) {
	const uuid = (await params).uuid;
	if (!uuid) return new NextResponse(null, { status: 400 });
	const [deletedKey] = await db
		.delete(keys)
		.where(eq(keys.maDinhDanhNguoiDung, uuid))
		.returning();
	const [deletedSession] = await db
		.delete(sessions)
		.where(eq(sessions.maDinhDanhNguoiDung, uuid))
		.returning();
	const [deletedRole] = await db
		.delete(users)
		.where(eq(users.maDinhDanh, uuid))
		.returning();
	if (!deletedKey && !deletedRole && !deletedSession)
		return new NextResponse(null, { status: 500 });
	return new NextResponse(null);
}
