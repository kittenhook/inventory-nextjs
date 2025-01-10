import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { Session, User } from "./lib/schema";
import { retrieveUserSessionBySession } from "./lib/userInteractions";

type sessionObjectType = {
	user: User;
	session: Session;
};

export const config = {
	matcher: [
		"/api/database/:path*",
		"/database/:path",
		"/auth/:path*",
		"/home",
	],
};

export default async function middleware(request: NextRequest) {
	switch (request.nextUrl.pathname.startsWith("/api")) {
		case true:
			return ApiMiddleware(request);
		case false:
			return PageMiddleware(request);
	}
}

async function ApiMiddleware(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith("/api/auth")) {
		return NextResponse.next();
	}
	const sessionObjectCookie = request.cookies.get("sessionObject");
	if (
		!sessionObjectCookie ||
		(!sessionObjectCookie &&
			!request.nextUrl.pathname.startsWith("/api/auth"))
	)
		return new NextResponse(null, { status: 401 });
	const sessionObject: sessionObjectType = JSON.parse(
		sessionObjectCookie.value
	);
	const expireDate = sessionObject.session.expiresAt.getTime();
	if (Date.now() - expireDate > 0) {
		request.cookies.delete("sessionObject");
		return new NextResponse(null, { status: 401 });
	}
	const token: string = sessionObject.session.token;

	// fetch /api/auth/authenticate
	const serverSessionResponse = await fetch(
		`${request.nextUrl.origin}/api/auth/authenticate?token=${token}`
	);
	if (serverSessionResponse.status != 200)
		return new NextResponse(null, { status: 401 });

	const serverSession = await serverSessionResponse.text();

	if (serverSession !== sessionObjectCookie.value)
		return new NextResponse(null, { status: 401 });

	return NextResponse.next();
}
async function PageMiddleware(request: NextRequest) {
	const loginURL = new URL("/auth/login", request.nextUrl.origin);
	const homeURL = new URL("/home", request.nextUrl.origin);
	const sessionObjectCookie = request.cookies.get("sessionObject");

	// no sessionObject OR (no sessionObject AND not in /auth)
	if (
		!sessionObjectCookie ||
		(!sessionObjectCookie && !request.nextUrl.pathname.startsWith("/auth"))
	)
		return NextResponse.redirect(loginURL);
	const sessionObject = sessionObjectCookie.value;

	// sessionObject exists, and in /auth
	if (sessionObjectCookie && request.nextUrl.pathname.startsWith("/auth"))
		return NextResponse.redirect(homeURL);

	// validate sessionObject, if fail, delete it
	/**
	 * retrieve cookie from server => if fail, delete it right away
	 * check against it => if fail delete it right away
	 * if everything is good, go downstream
	 */
	const serverSessionObjectResponse = await fetch(
		`${request.nextUrl.origin}/api/authenticate?=${sessionObject}`
	);

	const serverSessionObject: sessionObjectType =
		await serverSessionObjectResponse.json();

	if (!serverSessionObjectResponse.ok) {
		return NextResponse.redirect(loginURL);
	}

	if (
		!serverSessionObject ||
		// prettier-ignore
		JSON.stringify(serverSessionObject.session) !== JSON.stringify(sessionObject)
	) {
		// failed, delete cookie and return to auth
		request.cookies.delete("sessionObject");
		return NextResponse.redirect(loginURL);
	}
	return NextResponse.next();
}
