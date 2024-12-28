import { NewPost, posts } from "@/lib/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function retrievePost(maDinhDanh: string): Promise<{
	maDinhDanh: string;
	ten: string;
	moTa: string | null;
	noiDung: string | null;
	ngayTao: Date;
	maDinhDanhTacGia: string;
} | null> {
	const post = await db
		.select()
		.from(posts)
		.where(eq(posts.maDinhDanh, maDinhDanh))
		.limit(1);
	return post[0];
}

export async function retrieveAllPosts() {
	const allPosts = await db.select().from(posts);
	return allPosts;
}

export async function createPost(
	name: string,
	author_uuid: string,
	description?: string,
	content?: string
) {
	const post: NewPost = {
		maDinhDanh: crypto.randomUUID(),
		ten: name,
		moTa: description ?? "no description provided",
		noiDung: content ?? "no content provided",
		ngayTao: new Date(Date.now()),
		maDinhDanhTacGia: author_uuid,
	};
	const [createdPost] = await db
		.insert(posts)
		.values(post)
		.returning({ uuid: posts.maDinhDanh });
	return createdPost;
}
