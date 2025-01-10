import { deleteUser, retrieveUser, updateUser } from "@/lib/userInteractions";
import { NextRequest, NextResponse } from "next/server";

/**
 * * PARAMS = SLUGS
 * * REQ.JSON() = REQUEST BODY
 */

type UpdateBody = {
	maDinhDanh: string;
	ten?: string;
	email?: string;
	maDinhDanhQuyen?: string;
};

type Parameters = {
	uuid: string;
};

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<Parameters> }
) {
	// try {
	// 	let statusCode = 200;
	// 	const uuid = (await params).uuid;
	// 	const user = await retrieveUser({ maDinhDanh: uuid });
	// 	if (!user) {
	// 		statusCode = 404;
	// 	}
	// 	return NextResponse.json({ user: user }, { status: statusCode });
	// } catch (e) {
	// 	console.log(e);
	// 	return NextResponse.json(
	// 		{ message: "server-side error" },
	// 		{ status: 500 }
	// 	);
	// }
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<Parameters> }
) {
	const uuid = (await params).uuid;
	const user = await deleteUser({ maDinhDanh: uuid });
}

export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<Parameters> }
) {
	try {
		const uuid = (await params).uuid;
		const updateParameters: UpdateBody = await req.json();
		const updatedUser = await updateUser(updateParameters);
		return NextResponse.json(updatedUser, { status: 200 });
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{
				message: "There was a problem updating the specified user.",
			},
			{
				status: 500,
			}
		);
	}
}
