import { createNewTree } from "@/lib/dbInteractions";
import { LoaiGiong } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const body: Omit<LoaiGiong, "maDinhDanh"> = await req.json();
	try {
		const newTree = await createNewTree({
			maDinhDanh: globalThis.crypto.randomUUID(),
			...body,
		});
		return NextResponse.json(newTree, { status: 200 });
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{ message: "server-side error." },
			{
				status: 500,
			}
		);
	}
}
