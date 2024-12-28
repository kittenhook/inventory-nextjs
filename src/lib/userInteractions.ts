import { eq } from "drizzle-orm";
import { db } from "./db";
import { users, NewUser, keys, NewKeys, sessions, newSession } from "./schema";
import { hash } from "argon2";
import { randomBytes } from "node:crypto";
export async function createUser(
	name: string,
	email: string,
	password: string,
	role: "member" | "moderator"
) {
	let memberOrModUUID = "e81ecf50-f308-43ff-a5c8-f33a083b297b";
	if (role == "moderator") {
		memberOrModUUID = "521ea213-1e6e-4026-9b6f-3b07a519af46";
	} else if (role == "member") {
		memberOrModUUID = "e81ecf50-f308-43ff-a5c8-f33a083b297b";
	}
	const userData: NewUser = {
		maDinhDanh: crypto.randomUUID(),
		ten: name,
		email: email,
		maDinhDanhQuyen: memberOrModUUID,
	};
	const existingUser = await db
		.select()
		.from(users)
		.where(eq(users.email, email));
	if (existingUser.length > 0) {
		throw new Error("User already exists.");
	}
	const [createdUser] = await db
		.insert(users)
		.values(userData)
		.returning({ uuid: users.maDinhDanh });

	const keyData: NewKeys = {
		maDinhDanh: crypto.randomUUID(),
		matKhau: await hash(password),
		maDinhDanhNguoiDung: createdUser.uuid,
	};

	await db.insert(keys).values(keyData);
	return createdUser;
}

export async function retrieveUser(maDinhDanh: string) {
	const [user] = await db
		.select()
		.from(users)
		.where(eq(users.maDinhDanh, maDinhDanh));
	return user;
}

export async function retrieveUsersKey(email: string) {
	const [user] = await db
		.select({
			uuid: users.maDinhDanh,
			key: {
				maDinhDanh: keys.maDinhDanh,
				matKhau: keys.matKhau,
			},
		})
		.from(users)
		.where(eq(users.email, email))
		.innerJoin(keys, eq(keys.maDinhDanhNguoiDung, users.maDinhDanh));
	return user;
}

export async function createUserSession(maDinhDanhNguoiDung: string) {
	const token = randomBytes(32).toString("hex");
	const sessionData: newSession = {
		token: token,
		expiresAt: new Date(Date.now() + 18000000),
		maDinhDanhNguoiDung: maDinhDanhNguoiDung,
	};
	await db.insert(sessions).values(sessionData);
	return token;
}
