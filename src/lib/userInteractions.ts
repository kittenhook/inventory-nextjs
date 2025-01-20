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
	Role,
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

export async function updateUser(userArguments: User) {
	const [updatedUser] = await db
		.update(users)
		.set(userArguments)
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
	const [newSession] = await db
		.insert(sessions)
		.values(sessionData)
		.returning();
	return newSession;
}

export async function deleteUserSession(userArguments: { token: string }) {
	const [deletedSession] = await db
		.delete(sessions)
		.where(eq(sessions.token, userArguments.token))
		.returning();
	if (!deletedSession) return false;
	return true;
}

export async function retrieveAllUserRoles() {
	return db.select().from(roles);
}

export async function retrieveUserRole(roleArgument: { uuid: string }) {
	const [role] = await db
		.select()
		.from(roles)
		.where(eq(roles.maDinhDanh, roleArgument.uuid));
	if (!role) return null;
	return role;
}

export async function createUserRole(roleArgument: Role) {
	if (!roleArgument) return null;
	const [newRole] = await db.insert(roles).values(roleArgument).returning();
	return newRole;
}

export async function updateUserRole(roleArguments: Role) {
	const [updatedRole] = await db
		.update(roles)
		.set(roleArguments)
		.where(eq(roles.maDinhDanh, roleArguments.maDinhDanh))
		.returning();
	if (!updatedRole) return null;
	return updatedRole;
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
	return user;
}

export async function roleAuthenticate(userArguments: {
	role_uuid: string | null;
}): Promise<boolean> {
	if (!userArguments.role_uuid) return false;
	const [role] = await db
		.select()
		.from(roles)
		.where(eq(roles.maDinhDanh, userArguments.role_uuid));
	if (!role || role.isPrivileged == false) return false;
	return true;
}
