import {
	timestamp,
	text,
	pgTable,
	integer,
	boolean,
} from "drizzle-orm/pg-core";

// USER TABLES

export const roles = pgTable("Quyen", {
	maDinhDanh: text("maDinhDanh").notNull().unique().primaryKey(),
	ten: text("ten").notNull(),
});

export const users = pgTable("NguoiDung", {
	maDinhDanh: text("maDinhDanh").notNull().unique().primaryKey(),
	ten: text("ten").notNull(),
	email: text("email").notNull().unique(),
	maDinhDanhQuyen: text("maDinhDanhQuyen").references(
		() => roles.maDinhDanh,
		{
			onUpdate: "cascade",
			onDelete: "set null",
		}
	),
	initialSetupCompleted: boolean("initialSetupCompleted"),
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
		}),
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
	maDinhDanhTinhTrangBaoTon: text("maDinhDanhTinhTrangBaoTon").references(
		() => tinhTrangBaoTon.maDinhDanh,
		{
			onUpdate: "cascade",
			onDelete: "set null",
		}
	),
	maDinhDanhLoaiBienDong: text("maDinhDanhLoaiBienDong").references(
		() => loaiBienDong.maDinhDanh,
		{
			onUpdate: "cascade",
			onDelete: "set null",
		}
	),
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

export const tinhTrangBaoTon = pgTable("tinhTrangBaoTon", {
	maDinhDanh: text("maDinhDanh").notNull().unique().primaryKey(),
	ten: text("ten").notNull(),
});

// USER TYPES

export type Role = typeof roles.$inferSelect;
export type newRole = typeof roles.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Keys = typeof keys.$inferSelect;
export type NewKey = typeof keys.$inferInsert;

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

export type TinhTrangBaoTon = typeof tinhTrangBaoTon.$inferSelect;
export type newTinhTrangBaoTon = typeof tinhTrangBaoTon.$inferInsert;

export type LoaiBienDong = typeof loaiBienDong.$inferSelect;
export type newLoaiBienDong = typeof loaiBienDong.$inferInsert;

export type baselineType = {
	maDinhDanh: string;
	ten: string;
};
