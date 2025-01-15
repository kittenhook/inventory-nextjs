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
	cities,
	districts,
	LoaiGiong,
} from "./schema";

import { eq } from "drizzle-orm";

export async function retrieveAllLoaiBienDong() {
	return await db.select().from(loaiBienDong);
}

export async function retrieveAllTinhTrangBaoTon() {
	return await db.select().from(tinhTrangBaoTon);
}

export async function retrieveTinhTrangBaoTon(aarguments: { uuid: string }) {
	const [ttbt] = await db
		.select()
		.from(tinhTrangBaoTon)
		.where(eq(tinhTrangBaoTon.maDinhDanh, aarguments.uuid));
	if (!ttbt) return null;
	return ttbt;
}

export async function retrieveLoaiBienDong(aarguments: { uuid: string }) {
	const [lbd] = await db
		.select()
		.from(loaiBienDong)
		.where(eq(loaiBienDong.maDinhDanh, aarguments.uuid));
	if (!lbd) return null;
	return lbd;
}

export async function retrieveAllAnimals() {
	return await db.select().from(loaiDongVat);
}

export async function retrieveAnimal(animalArguments: { maDinhDanh: string }) {
	const [animal] = await db
		.select()
		.from(loaiDongVat)
		.where(eq(loaiDongVat.maDinhDanh, animalArguments.maDinhDanh));
	if (!animal) return null;
	return animal;
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

export async function retrieveTree(treeArguments: { maDinhDanh: string }) {
	const [animal] = await db
		.select()
		.from(loaiGiong)
		.where(eq(loaiGiong.maDinhDanh, treeArguments.maDinhDanh));
	if (!animal) return null;
	return animal;
}

export async function updateTree(treeArguments: LoaiGiong) {
	const tree = await retrieveTree({ maDinhDanh: treeArguments.maDinhDanh });
	if (!tree) return null;
	const updatedTreeData = {
		ten: treeArguments.ten || tree.ten,
	};
	const [updatedTree] = await db
		.update(loaiGiong)
		.set(updatedTreeData)
		.where(eq(loaiGiong.maDinhDanh, treeArguments.maDinhDanh))
		.returning();
	if (!updatedTree) return null;
	return updatedTree;
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

export async function retrieveAnimalFactory(factoryArguments: {
	maDinhDanh: string;
}) {
	const [animalFactory] = await db
		.select()
		.from(coSoLuuTruDongVat)
		.where(eq(coSoLuuTruDongVat.maDinhDanh, factoryArguments.maDinhDanh));
	if (!animalFactory) return null;
	return animalFactory;
}

export async function retrieveTreeFactory(factoryArguments: {
	maDinhDanh: string;
}) {
	const [treeFactory] = await db
		.select()
		.from(coSoSanXuatCay)
		.where(eq(coSoSanXuatCay.maDinhDanh, factoryArguments.maDinhDanh));
	if (!treeFactory) return null;
	return treeFactory;
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

export async function retrieveAllCities() {
	return await db.select().from(cities);
}

export async function retrieveAllDistricts() {
	return await db.select().from(districts);
}

export async function retrieveDistrict(uuid: string) {
	const [district] = await db
		.select()
		.from(districts)
		.where(eq(districts.maDinhDanh, uuid));
	if (!district) return null;
	return district;
}

export async function retrieveCity(uuid: string) {
	const [city] = await db
		.select()
		.from(cities)
		.where(eq(cities.maDinhDanh, uuid));
	return city;
}
