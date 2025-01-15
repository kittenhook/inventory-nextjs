import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { Session, User } from "./lib/schema";

type sessionObjectType = {
	user: User;
	session: Session;
};

export const config = {
	matcher: ["/api/database/:path*", "/database/:path", "/"],
};

export default async function middleware(request: NextRequest) {
	switch (request.nextUrl.pathname.startsWith("/api")) {
		case true:
			// return ApiMiddleware(request);
			return NextResponse.next();
		case false:
			// return PageMiddleware(request);
			return NextResponse.next();
	}
}

async function ApiMiddleware(request: NextRequest) {
	const sessionObjectCookie = request.cookies.get("sessionObject");
	if (!sessionObjectCookie) {
		if (!request.nextUrl.pathname.startsWith("/api/auth")) {
			return new NextResponse(null, { status: 401 });
		}
		return NextResponse.next();
	}
}
async function PageMiddleware(request: NextRequest) {
	const loginURL = new URL("/auth/login", request.nextUrl.origin);
	const homeURL = new URL(request.nextUrl.origin);
	const sessionObjectCookie = request.cookies.get("sessionObject");

	/**
	 * four cases:
	 * 1. user doesnt have token, and is accessing protected routes => redirect to auth routes => jumps to 2.
	 * 2. user doesnt have token, and is accessing auth routes => return next() immediately
	 * 3. user has token, and is accessing auth routes => redirects to home (protected route) => jumps to 4.
	 * 4. user has token, and is accessing protected routes => validates it (rest of the code)
	 */
	if (!sessionObjectCookie) {
		if (!request.nextUrl.pathname.startsWith("/auth")) {
			return NextResponse.redirect(loginURL);
		}
		return NextResponse.next();
	}
	if (request.nextUrl.pathname.startsWith("/auth"))
		return NextResponse.redirect(homeURL);
	// if (sessionObjectCookie && !request.nextUrl.pathname.startsWith("/auth"))
	// validate sessionObject, if fail, delete it
	/**
	 * retrieve cookie from server => if fail, delete it right away
	 * check against it => if fail delete it right away
	 * if everything is good, go downstream
	 */
	const sessionObject: sessionObjectType = JSON.parse(
		sessionObjectCookie.value
	);
	let serverSessionObjectResponse = null;
	try {
		serverSessionObjectResponse = await fetch(
			`${request.nextUrl.origin}/api/auth/authenticate?token=${sessionObject.session.token}`
		);
	} catch (e) {
		console.log(e);
		return NextResponse.next();
	}

	if (!serverSessionObjectResponse.ok) {
		return NextResponse.redirect(loginURL);
	}

	const serverSessionObject: sessionObjectType =
		await serverSessionObjectResponse.json();

	if (!serverSessionObjectResponse.ok) {
		return NextResponse.redirect(loginURL);
	}

	if (
		!serverSessionObject ||
		// prettier-ignore
		JSON.stringify(serverSessionObject) !== JSON.stringify(sessionObject)
	) {
		request.cookies.delete("sessionObject");
		return NextResponse.redirect(loginURL);
	}
	return NextResponse.next();
}
