"use client";
import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import type { Post } from "@/lib/types";

export default function RemotePosts({
    categories,
    initialPosts,
}: {
    categories: string[];
    initialPosts: Post[];
}) {
    const [category, setCategory] = useState("全部");
    const { data, isPending, isError } = useQuery({
        queryKey: ["posts", category],
        queryFn: () => fetch(`/api/posts?category=${encodeURIComponent(category)}`).then(r => r.json()),
        enabled: category !== "全部",   // 首屏用服务端数据，切分类才请求接口
    });

    const posts: Post[] = category === "全部" ? initialPosts : (data ?? []);

    return (
        <div className="space-y-3">
            <div className="flex gap-2">
                {categories.map(c => (
                    <button
                        key={c}
                        onClick={() => setCategory(c)}
                        className={"border px-3 py-1 rounded cursor-pointer " + (c === category ? "bg-blue-500 text-white" : "")}
                    >
                        {c}
                    </button>
                ))}
            </div>
            {category !== "全部" && isPending ? (
                <p>加载中...</p>
            ) : category !== "全部" && isError ? (
                <p>出错了</p>
            ) : posts.length === 0 ? (
                <p>这个分类还没有文章。</p>
            ) : (
                <ul className="space-y-2">
                    {posts.map((p: Post) => (
                        <li key={p.id} className="flex items-center justify-between border-b pb-1">
                            <Link href={`/posts/${p.slug}`} className="text-blue-600 hover:underline">
                                {p.title}
                            </Link>
                            <Link href={`/posts/${p.slug}/edit`} className="text-sm text-gray-500 hover:underline">
                                编辑
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

