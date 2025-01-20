import { db } from "@/lib/db";
import { loaiHinhSanXuat } from "@/lib/schema";
import { NextResponse } from "next/server";

export async function GET() {
	const lhsx = await db.select().from(loaiHinhSanXuat);
	if (!lhsx) return new NextResponse(null, { status: 404 });
	return NextResponse.json(lhsx);
}
