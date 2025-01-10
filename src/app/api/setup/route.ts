import { updateUser } from "@/lib/userInteractions";
import { NextRequest, NextResponse } from "next/server";

type SetupBody = {
	maDinhDanhQuyen: string;
};

export async function POST(req: NextRequest) {
	const uuid = JSON.parse(req.cookies.get("sessionObject")!.value).user
		.maDinhDanh;
	const body: SetupBody = await req.json();
	if (!body.maDinhDanhQuyen)
		return NextResponse.json(
			{ message: "empty field detected." },
			{
				status: 400,
			}
		);
	try {
		const user = await updateUser({
			maDinhDanh: uuid,
			maDinhDanhQuyen: body.maDinhDanhQuyen,
		});
		return NextResponse.json(user, { status: 200 });
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{ message: "failed to update the role of specified user." },
			{ status: 500 }
		);
	}
}
