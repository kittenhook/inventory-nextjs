import { retrieveAllAnimals } from "@/lib/dbInteractions";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const animals = await retrieveAllAnimals();
		console.log(animals);
		return NextResponse.json(animals, { status: 200 });
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{ message: "server-side error" },
			{
				status: 500,
			}
		);
	}
}
