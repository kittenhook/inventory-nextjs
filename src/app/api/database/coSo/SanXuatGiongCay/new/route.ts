import { createTreeFactory } from "@/lib/dbInteractions";
import { newCoSoSanXuatCay } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

type TreeFactoryBody = Omit<newCoSoSanXuatCay, "maDinhDanh">;

export async function POST(req: NextRequest) {
	const body: TreeFactoryBody = await req.json();
	try {
		const treeFactory = await createTreeFactory(body);
		return NextResponse.json(treeFactory);
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{ message: "server-side error" },
			{ status: 500 }
		);
	}
}
