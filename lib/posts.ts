"use cache";
import { cacheLife, cacheTag } from "next/cache";
import type { Post } from "./types";


const globalForPosts = globalThis as unknown as { __lab3Posts?: Post[] };
const seedPosts: Post[] = [
    { id: "1700000000001", slug: "hello", title: "我的第一篇博客", content: "从create-vite到create-next-app。", category: "技术", publishedAt: "2026-10-01" },
    { id: "1700000000002", slug: "fullstack", title: "全栈是什么感觉", content: "后厨直接端菜，传菜员少跑一半路。", category: "随笔", publishedAt: "2026-10-02" },
    { id: "1700000000003", slug: "rsc-notes", title: "RSC 学习笔记", content: "服务端组件省掉了多少浏览器JS。", category: "技术", publishedAt: "2026-09-28" },
    { id: "1700000000004", slug: "tailwind-notes", title: "Tailwind 上手记录", content: "原子类写多了，改样式反而更快。", category: "技术", publishedAt: "2026-09-20" },
    { id: "1700000000005", slug: "campus-life", title: "校园生活随笔", content: "图书馆的座位比食堂的饭难抢。", category: "生活", publishedAt: "2026-09-15" },
    { id: "1700000000006", slug: "study-plan", title: "这个学期的学习计划", content: "每周留两个晚上写代码。", category: "随笔", publishedAt: "2026-09-10" },
];
const posts: Post[] = globalForPosts.__lab3Posts ?? (globalForPosts.__lab3Posts = seedPosts);

export async function getPosts(category?: string) {
    "use cache";                // 这份数据构建期生成并缓存  
    cacheLife("minutes");   // 客户端5分钟、后台1分钟重新生成、1小时过期
    cacheTag("posts");
    return category && category !== "全部" ? posts.filter(p => p.category === category) : posts;
}
export async function getPost(slug: string) {
    "use cache";
    cacheLife("minutes");
    cacheTag("posts");
    return posts.find(p => p.slug === slug);
}
export async function getCategories() {
    const all = await getPosts();
    return ["全部", ...Array.from(new Set(all.map(p => p.category)))];
}
export async function addPost(p: Omit<Post, "id" | "slug" | "publishedAt">) {
    const post: Post = { ...p, id: String(Date.now()), slug: "post-" + Date.now(), publishedAt: new Date().toISOString().slice(0, 10) };
    posts.unshift(post);
    return post;
}
export async function updatePost(slug: string, patch: Partial<Post>) {
    const i = posts.findIndex(p => p.slug === slug);
    if (i >= 0) posts[i] = { ...posts[i], ...patch };
    return posts[i];
}
export async function deletePost(slug: string) {
    const i = posts.findIndex(p => p.slug === slug);
    if (i >= 0) posts.splice(i, 1);
}