// resolve token into user objecet
import { retrieveUserSessionBySession } from "@/lib/userInteractions";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const cookiesStore = await cookies();
	const session = cookiesStore.get("session");
	if (!session) return new NextResponse(null, { status: 400 });
	const user = await retrieveUserSessionBySession({ token: session.value });
	if (!user) return new NextResponse(null, { status: 404 });
	return NextResponse.json(user);
}
