import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { users } from "@/lib/schema";

export async function POST(req: NextRequest) {
	const queryURL = req.nextUrl.searchParams.get("a");
	const queryString = `SELECT * FROM "NguoiDung" WHERE "maDinhDanh"='${queryURL}' OR '1'='1'`;
	console.log(queryString);
	const queryResult = await db.execute(queryString);
	return NextResponse.json(queryResult);
}
