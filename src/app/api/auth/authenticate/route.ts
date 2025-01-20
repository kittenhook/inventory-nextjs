// resolve token into user objecet
import {
	retrieveUserSessionBySession,
	roleAuthenticate,
} from "@/lib/userInteractions";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const cookiesStore = await cookies();
	const session = cookiesStore.get("session");
	if (!session) return new NextResponse(null, { status: 400 });
	const user = await retrieveUserSessionBySession({ token: session.value }); // retrieve user by session
	if (!user) return new NextResponse(null, { status: 404 });
	// user exists, now we need to retrieve associated role.
	const isPrivileged = user.maDinhDanhQuyen
		? await roleAuthenticate({ role_uuid: user.maDinhDanhQuyen })
		: false;
	return NextResponse.json({
		user: user,
		isPrivileged: isPrivileged,
	});
}
