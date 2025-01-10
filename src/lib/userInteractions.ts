import { eq } from "drizzle-orm";
import { db } from "./db";
import {
	users,
	NewUser,
	keys,
	NewKey,
	sessions,
	newSession,
	roles,
	newRole,
	User,
} from "./schema";
import { hash } from "argon2";

export async function createUser(
	name: string,
	email: string,
	password: string
) {
	const userData: NewUser = {
		maDinhDanh: globalThis.crypto.randomUUID(),
		ten: name,
		email: email,
		initialSetupCompleted: false,
	};
	const [existingUser] = await db
		.select()
		.from(users)
		.where(eq(users.email, email));
	console.log(existingUser);
	if (existingUser) {
		throw new Error("User already exists.");
	}
	const [createdUser] = await db.insert(users).values(userData).returning();

	const keyData: NewKey = {
		maDinhDanh: globalThis.crypto.randomUUID(),
		matKhau: await hash(password),
		maDinhDanhNguoiDung: createdUser.maDinhDanh,
	};

	await db.insert(keys).values(keyData);
	return createdUser;
}

export async function retrieveUser(userArguments: {
	maDinhDanh: string;
}): Promise<User | null> {
	const [user] = await db
		.select()
		.from(users)
		.where(eq(users.maDinhDanh, userArguments.maDinhDanh));
	if (!user) return null;
	return user;
}

export async function updateUser(userArguments: {
	maDinhDanh: string;
	name?: string;
	email?: string;
	maDinhDanhQuyen?: string;
}): Promise<User | null> {
	const user = await retrieveUser({ maDinhDanh: userArguments.maDinhDanh });
	if (!user) return null;
	const values: NewUser = {
		maDinhDanh: user.maDinhDanh,
		ten: userArguments.name ?? user.ten,
		email: userArguments.email ?? user.email,
		maDinhDanhQuyen: userArguments.maDinhDanhQuyen ?? user.maDinhDanhQuyen,
	};
	const [updatedUser] = await db
		.update(users)
		.set(values)
		.where(eq(users.maDinhDanh, userArguments.maDinhDanh))
		.returning();
	return updatedUser;
}

export async function deleteUser(userArguments: {
	maDinhDanh: string;
}): Promise<User | null> {
	const [deletedUser] = await db
		.delete(users)
		.where(eq(users.maDinhDanh, userArguments.maDinhDanh))
		.returning();
	return deletedUser;
}

export async function retrieveAllUsers() {
	return await db.select().from(users);
}

export async function retrieveUsersKey(userArguments: { email: string }) {
	const [user] = await db
		.select({
			user: users,
			key: {
				maDinhDanh: keys.maDinhDanh,
				matKhau: keys.matKhau,
			},
		})
		.from(users)
		.where(eq(users.email, userArguments.email))
		.innerJoin(keys, eq(keys.maDinhDanhNguoiDung, users.maDinhDanh));
	if (!user) return null;
	return user;
}
function generateRandomBytes(byte_count: number) {
	if (byte_count < 0) throw new Error("invalid byte size.");
	const randomBytes = new Uint8Array(byte_count);
	globalThis.crypto.getRandomValues(randomBytes);
	const hexString = Array.from(randomBytes)
		.map((bytes) => bytes.toString(16).padStart(2, "0"))
		.join("");
	return hexString;
}
export async function createUserSession(userArguments: {
	maDinhDanhNguoiDung: string;
}) {
	const token = generateRandomBytes(32);
	const sessionData: newSession = {
		token: token,
		expiresAt: new Date(Date.now() + 18000000), // 5 hours into the future
		maDinhDanhNguoiDung: userArguments.maDinhDanhNguoiDung,
	};
	await db.insert(sessions).values(sessionData);
	return sessionData;
}

export async function deleteUserSession(userArguments: {
	maDinhDanhNguoiDung: string;
	token?: string;
	// if no token is specified, will wipe every single session under that user's uuid
}) {
	const eqExpression = userArguments.token
		? eq(sessions.token, userArguments.token)
		: eq(sessions.maDinhDanhNguoiDung, userArguments.maDinhDanhNguoiDung);
	try {
		await db.delete(sessions).where(eqExpression);
		return true;
	} catch (e) {
		console.log(e);
		return false;
	}
}

export async function retrieveAllUserRoles() {
	return db.select().from(roles);
}

export async function createUserRole(roleArgument: { ten: string }) {
	if (!roleArgument.ten) return null;
	const roleData: newRole = {
		maDinhDanh: globalThis.crypto.randomUUID(),
		ten: roleArgument.ten,
	};
	const [newRole] = await db.insert(roles).values(roleData).returning();
	return newRole;
}

export async function retrieveUserSessionBySession(tokenArguments: {
	token: string;
}) {
	const [session] = await db
		.select()
		.from(sessions)
		.where(eq(sessions.token, tokenArguments.token));
	if (!session) return null;
	const [user] = await db
		.select()
		.from(users)
		.where(eq(users.maDinhDanh, session.maDinhDanhNguoiDung));
	if (!user) return null;
	return {
		user: user,
		session: session,
	};
}
