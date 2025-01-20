import { db } from "@/lib/db";
import { CoSoSanXuatCay, coSoSanXuatCay } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const body: Omit<CoSoSanXuatCay, "maDinhDanh"> = await req.json();
	const data = {
		maDinhDanh: crypto.randomUUID(),
		...body,
	};
	const [newFac] = await db.insert(coSoSanXuatCay).values(data).returning();
	if (!newFac) return new NextResponse(null, { status: 400 });
	return NextResponse.json(newFac);
}
