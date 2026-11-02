"use server";
import { addPost, updatePost, deletePost } from "@/lib/posts";
import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";

export type CreateState = { ok?: boolean; error?: string };

export async function createPost(
    prevState: CreateState,
    formData: FormData,
): Promise<CreateState> {
    const title = String(formData.get("title") || "").trim();
    const content = String(formData.get("content") || "").trim();
    const category = String(formData.get("category") || "技术");
    if (!title || !content) return { error: "标题和正文不能为空" };
    await addPost({ title, content, category });
    revalidatePath("/");
    updateTag("posts");
    return { ok: true };
}

export async function removePost(formData: FormData) {
    const slug = String(formData.get("slug"));
    await deletePost(slug);
    revalidatePath("/");
    updateTag("posts");
    redirect("/");   // 删除后自动回首页
}

export async function editPost(formData: FormData) {
    const slug = String(formData.get("slug"));
    const title = String(formData.get("title") || "").trim();
    const content = String(formData.get("content") || "").trim();
    await updatePost(slug, { title, content });
    revalidatePath("/");
    revalidatePath(`/posts/${slug}`);
    updateTag("posts");
    redirect("/");   // 保存后自动回首页
}