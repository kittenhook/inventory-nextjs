import { createNewAnimal } from "@/lib/dbInteractions";
import { LoaiDongVat } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const {
		ten,
		moiTruongSong,
		viTriPhanBo,
		maDinhDanhLoaiBienDong,
		maDinhDanhTinhTrangBaoTon,
	}: LoaiDongVat = await req.json();
	if (!ten)
		return NextResponse.json(
			{ message: "empty field detected." },
			{ status: 400 }
		);
	try {
		const newAnimal = await createNewAnimal({
			maDinhDanh: globalThis.crypto.randomUUID(),
			ten: ten,
			moiTruongSong: moiTruongSong,
			viTriPhanBo: viTriPhanBo,
			maDinhDanhLoaiBienDong: maDinhDanhLoaiBienDong,
			maDinhDanhTinhTrangBaoTon: maDinhDanhTinhTrangBaoTon,
		});
		return NextResponse.json(newAnimal, { status: 200 });
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{ message: "server-side error." },
			{
				status: 500,
			}
		);
	}
}
