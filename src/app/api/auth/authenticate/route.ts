// resolve token into user objecet
import { retrieveUserSessionBySession } from "@/lib/userInteractions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const { searchParams } = req.nextUrl;
	const token = searchParams.get("token");
	if (!token)
		return NextResponse.json({ message: "Bad Request" }, { status: 400 });
	const sessionObject = await retrieveUserSessionBySession({ token: token });
	if (!sessionObject)
		return NextResponse.json(
			{ message: "Unauthenticated" },
			{ status: 404 }
		);
	return new NextResponse(JSON.stringify(sessionObject));
}
