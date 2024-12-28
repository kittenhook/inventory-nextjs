import { timestamp, text, pgTable } from "drizzle-orm/pg-core";

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
		}),
});

export const phanLoaiGiong = pgTable("phanLoaiGiong", {
	maDinhDanh: text("maDinhDanh").notNull().unique().primaryKey(),
	loaiCay: text("loaiCay").notNull(),
	ngayTimThay: timestamp("ngayTimThay", { mode: "date" }).notNull(),
});

export const coSoSanXuat = pgTable("coSoSanXuat", {
	maDinhDanh: text("maDinhDanh").notNull().unique().primaryKey(),
	ten: text("ten").notNull().unique(),
});

export const thanhPho = pgTable("thanhPho", {
	maDinhDanh: text("maDinhDanh").notNull().unique().primaryKey(),
	ten: text("ten").notNull().unique(),
});

export const quan = pgTable("quan", {
	maDinhDanh: text("maDinhDanh").notNull().unique().primaryKey(),
	ten: text("ten").notNull().unique(),
	maDinhDanhThanhPho: text("maDinhDanhThanhPho")
		.notNull()
		.references(() => thanhPho.maDinhDanh, {
			onDelete: "cascade",
			onUpdate: "cascade",
		}),
});

export const phuong = pgTable("phuong", {
	maDinhDanh: text("maDinhDanh").notNull().unique().primaryKey(),
	maDinhDanhQuan: text("maDinhDanhQuan")
		.notNull()
		.references(() => quan.maDinhDanh, {
			onDelete: "cascade",
			onUpdate: "cascade",
		}),
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

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Keys = typeof keys.$inferSelect;
export type NewKeys = typeof keys.$inferInsert;

export type Species = typeof phanLoaiGiong.$inferSelect;
export type NewSpecies = typeof phanLoaiGiong.$inferInsert;

export type Session = typeof sessions.$inferSelect;
export type newSession = typeof sessions.$inferInsert;
