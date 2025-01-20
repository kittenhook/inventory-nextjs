import { db } from "@/lib/db";
import { hinhThucSanXuat } from "@/lib/schema";
import { NextResponse } from "next/server";
export async function GET() {
	const htsx = await db.select().from(hinhThucSanXuat);
	if (!htsx) return new NextResponse(null, { status: 404 });
	return NextResponse.json(htsx);
}
