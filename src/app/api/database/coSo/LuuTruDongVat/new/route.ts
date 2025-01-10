import { createAnimalFactory } from "@/lib/dbInteractions";
import { NextRequest, NextResponse } from "next/server";

type AnimalFactoryBody = {
	ten: string;
	maDinhDanhLoaiDongVat: string;
};

export async function POST(req: NextRequest) {
	const body: AnimalFactoryBody = await req.json();
	if (!body.ten || !body.maDinhDanhLoaiDongVat)
		return NextResponse.json(
			{ message: "empty field detected." },
			{ status: 500 }
		);
	try {
		const animalFactory = await createAnimalFactory({
			ten: body.ten,
			maDinhDanhLoaiDongVat: body.maDinhDanhLoaiDongVat,
		});
		return NextResponse.json(animalFactory, { status: 200 });
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{ message: "server-side error." },
			{ status: 500 }
		);
	}
}
