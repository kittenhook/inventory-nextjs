import { db } from "@/lib/db";
import { retrieveTinhTrangBaoTon } from "@/lib/dbInteractions";
import { tinhTrangBaoTon } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

type Parameters = {
	uuid: string;
};

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<Parameters> }
) {
	const uuid = (await params).uuid;
	const ttbt = retrieveTinhTrangBaoTon({ uuid: uuid });
	if (!ttbt) return NextResponse.json({}, { status: 404 });
	return NextResponse.json(ttbt);
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<Parameters> }
) {
	const uuid = (await params).uuid;
	try {
		await db
			.delete(tinhTrangBaoTon)
			.where(eq(tinhTrangBaoTon.maDinhDanh, uuid));
		return new NextResponse(null, { status: 200 });
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{ message: "server-side error." },
			{ status: 500 }
		);
	}
}
