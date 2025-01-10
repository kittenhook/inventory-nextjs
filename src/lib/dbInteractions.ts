import { db } from "./db";
import {
	newLoaiDongVat,
	loaiDongVat,
	loaiGiong,
	tinhTrangBaoTon,
	loaiBienDong,
	newLoaiGiong,
	coSoSanXuatCay,
	coSoLuuTruDongVat,
	newCoSoLuuTruDongVat,
	newCoSoSanXuatCay,
} from "./schema";

export async function retrieveAllLoaiBienDong() {
	return await db.select().from(loaiBienDong);
}

export async function retrieveAllTinhTrangBaoTon() {
	return await db.select().from(tinhTrangBaoTon);
}

export async function retrieveAllAnimals() {
	return await db.select().from(loaiDongVat);
}

export async function createNewAnimal(animalArguments: newLoaiDongVat) {
	const [newAnimal] = await db
		.insert(loaiDongVat)
		.values(animalArguments)
		.returning();
	return newAnimal;
}

export async function retrieveAllTrees() {
	return await db.select().from(loaiGiong);
}

export async function createNewTree(treeArguments: newLoaiGiong) {
	const [newTree] = await db
		.insert(loaiGiong)
		.values(treeArguments)
		.returning();
	return newTree;
}

export async function retrieveAllTreeFactories() {
	return await db.select().from(coSoSanXuatCay);
}

export async function retrieveAllAnimalFactories() {
	return await db.select().from(coSoLuuTruDongVat);
}

export async function createAnimalFactory(
	factoryArguments: Omit<newCoSoLuuTruDongVat, "maDinhDanh">
) {
	const AnimalFactoryData: newCoSoLuuTruDongVat = {
		maDinhDanh: globalThis.crypto.randomUUID(),
		ten: factoryArguments.ten,
		maDinhDanhLoaiDongVat: factoryArguments.maDinhDanhLoaiDongVat,
	};
	const [animalFactory] = await db
		.insert(coSoLuuTruDongVat)
		.values(AnimalFactoryData)
		.returning();
	return animalFactory;
}

export async function createTreeFactory(
	factoryArguments: Omit<newCoSoSanXuatCay, "maDinhDanh">
) {
	const factoryData: newCoSoSanXuatCay = {
		...factoryArguments,
		maDinhDanh: globalThis.crypto.randomUUID(),
	};
	const [treeFactory] = await db
		.insert(coSoSanXuatCay)
		.values(factoryData)
		.returning();
	return treeFactory;
}
