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
	try {
		let statusCode = 200;
		const uuid = (await params).uuid;
		const user = await retrieveUser({ maDinhDanh: uuid });
		if (!user) {
			statusCode = 404;
		}
		return NextResponse.json({ user: user }, { status: statusCode });
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{ message: "server-side error" },
			{ status: 500 }
		);
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<Parameters> }
) {
	const uuid = (await params).uuid;
	const user = await deleteUser({ maDinhDanh: uuid });
	return NextResponse.json(user);
}

export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<Parameters> }
) {
	try {
		const body = await params;
		const updateParameters: UpdateBody = await req.json();
		const updateBody: UpdateBody = {
			maDinhDanh: body.uuid,
			ten: updateParameters.ten,
			email: updateParameters.email,
			maDinhDanhQuyen: updateParameters.maDinhDanhQuyen,
		};
		const updatedUser = await updateUser(updateBody);
		return NextResponse.json(updatedUser);
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
