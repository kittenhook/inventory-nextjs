import { createNewTree } from "@/lib/dbInteractions";
import { LoaiGiong } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { ten }: Omit<LoaiGiong, "maDinhDanh"> = await req.json();
	if (!ten)
		return NextResponse.json(
			{ message: "empty field detected." },
			{ status: 400 }
		);
	try {
		const newTree = await createNewTree({
			maDinhDanh: globalThis.crypto.randomUUID(),
			ten: ten,
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
