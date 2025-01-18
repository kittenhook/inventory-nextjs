import { updateAnimal } from "@/lib/dbInteractions";
import { LoaiDongVat } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ uuid: string }> }
) {
	const body: LoaiDongVat = await req.json();
	const animalData = { ...body, maDinhDanh: (await params).uuid };
	const updatedAnimal = updateAnimal(animalData);
	if (!updatedAnimal) return new NextResponse(null, { status: 400 });
	return NextResponse.json(updatedAnimal);
}
