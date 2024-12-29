import { timestamp, text, pgTable, integer } from "drizzle-orm/pg-core";

// USER TABLES

export const roles = pgTable("Quyen", {
	maDinhDanh: text("maDinhDanh").notNull().unique().primaryKey(),
	ten: text("ten").notNull(),
});

export const users = pgTable("NguoiDung", {
	maDinhDanh: text("maDinhDanh").notNull().unique().primaryKey(),
	ten: text("ten").notNull(),
	email: text("email").notNull().unique(),
	maDinhDanhQuyen: text("maDinhDanhQuyen")
		.notNull()
		.references(() => roles.maDinhDanh, {
			onUpdate: "cascade",
			onDelete: "set null",
		}),
});

export const keys = pgTable("Keys", {
	maDinhDanh: text("maDinhDanh").notNull().unique().primaryKey(),
	matKhau: text("matKhau").notNull(),
	maDinhDanhNguoiDung: text("maDinhDanhNguoiDung")
		.notNull()
		.references(() => users.maDinhDanh, {
			onDelete: "cascade",
			onUpdate: "cascade",
		})
		.unique(),
});

export const sessions = pgTable("session", {
	token: text("token").notNull().unique().primaryKey(),
	expiresAt: timestamp("expiresAt", { mode: "date" }).notNull(),
	maDinhDanhNguoiDung: text("maDinhDanhNguoiDung")
		.notNull()
		.references(() => users.maDinhDanh, {
			onDelete: "cascade",
			onUpdate: "cascade",
		})
		.unique(),
});

// INVENTORY TABLES

export const loaiGiong = pgTable("loaiGiong", {
	maDinhDanh: text("maDinhDanh").notNull().unique().primaryKey(),
	ten: text("ten").notNull().unique(),
});

export const coSoSanXuatCay = pgTable("coSoSanXuatCay", {
	maDinhDanh: text("maDinhDanh").notNull().unique().primaryKey(),
	ten: text("ten").notNull(),
	congSuat: integer("congSuat").notNull(),
	maDinhDanhLoaiGiong: text("maDinhDanhLoaiGiong")
		.references(() => loaiGiong.maDinhDanh, {
			onDelete: "set null",
			onUpdate: "cascade",
		})
		.unique(),
	maDinhDanhNguoiPhuTrach: text("maDinhDanhNguoiPhuTrach").references(
		() => users.maDinhDanh,
		{
			onDelete: "set null",
			onUpdate: "cascade",
		}
	),
});

export const loaiHinhSanXuat = pgTable("loaiHinhSanXuat", {
	maDinhDanh: text("maDinhDanh").notNull().unique().primaryKey(),
	ten: text("ten").notNull(),
});

export const hinhThucSanXuat = pgTable("hinhThucSanXuat", {
	maDinhDanh: text("maDinhDanh").notNull().unique().primaryKey(),
	ten: text("ten").notNull(),
});

// ANIMAL TABLES

export const loaiDongVat = pgTable("loaiDongVat", {
	maDinhDanh: text("maDinhDanh").notNull().unique().primaryKey(),
	ten: text("ten").notNull(),
	moiTruongSong: text("moiTruongSong"),
	viTriPhanBo: text("viTriPhanBo"),
	tinhTrangBaoTon: text("tinhTrangBaoTon"),
	maDinhDanhLoaiBienDong: text("maDinhDanhLoaiBienDong"),
});

export const coSoLuuTruDongVat = pgTable("coSoLuuTruDongVat", {
	maDinhDanh: text("maDinhDanh").notNull().unique().primaryKey(),
	ten: text("ten").notNull(),
	maDinhDanhLoaiDongVat: text("maDinhDanhLoaiDongVat")
		.references(() => loaiDongVat.maDinhDanh, {
			onDelete: "set null",
			onUpdate: "cascade",
		})
		.unique(),
});

export const loaiBienDong = pgTable("loaiBienDong", {
	maDinhDanh: text("maDinhDanh").notNull().unique().primaryKey(),
	ten: text("ten").notNull(),
});

// USER TYPES

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Keys = typeof keys.$inferSelect;
export type NewKeys = typeof keys.$inferInsert;

export type Session = typeof sessions.$inferSelect;
export type newSession = typeof sessions.$inferInsert;

// INVENTORY TYPES

export type LoaiGiong = typeof loaiGiong.$inferSelect;
export type newLoaiGiong = typeof loaiGiong.$inferInsert;

export type LoaiHinhSanXuat = typeof loaiHinhSanXuat.$inferSelect;
export type newLoaiHinhSanXuat = typeof loaiHinhSanXuat.$inferInsert;

export type HinhThucSanXuat = typeof hinhThucSanXuat.$inferSelect;
export type newHinhThucSanXuat = typeof hinhThucSanXuat.$inferInsert;

export type CoSoSanXuatCay = typeof coSoSanXuatCay.$inferSelect;
export type newCoSoSanXuatCay = typeof coSoSanXuatCay.$inferInsert;

// ANIMAL TYPES

export type LoaiDongVat = typeof loaiDongVat.$inferSelect;
export type newLoaiDongVat = typeof loaiDongVat.$inferInsert;

export type CoSoLuuTruDongVat = typeof coSoLuuTruDongVat.$inferSelect;
export type newCoSoLuuTruDongVat = typeof coSoLuuTruDongVat.$inferInsert;

export type LoaiBienDong = typeof loaiBienDong.$inferSelect;
export type newLoaiBienDong = typeof loaiBienDong.$inferInsert;
