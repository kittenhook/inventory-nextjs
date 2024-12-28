import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/post/:path", "/api/(^auth)/", "/home"];
const authRoutes = ["/auth/:path", "/api/auth/:path"];
const publicRoutes = ["/"];

export default async function middleware(request: NextRequest) {
	const user_uuid = request.cookies.get("user_uuid");
	if (!user_uuid)
		return NextResponse.redirect(
			new URL("/auth/login", request.nextUrl.origin).href
		);
	return NextResponse.next();
}

export const config = {
	matcher: ["/post/:path"],
};
