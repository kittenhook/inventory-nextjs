import { db } from "./db";
import { newLoaiDongVat, LoaiDongVat, loaiDongVat } from "./schema";

export async function retrieveAllAnimals() {
	const allAnimals = await db.select().from(loaiDongVat);
	return allAnimals;
}
