"use client";
import { useState } from "react";

export default function LikeButton({ slug }: { slug: string }) {
    const [liked, setLiked] = useState(false);
    return (
        <button
            onClick={() => setLiked(!liked)}
            aria-label={`给文章 ${slug} 点赞`}
            className="border px-3 py-1 rounded cursor-pointer hover:bg-gray-100"
        >
            {liked ? "已点赞" : "点赞"}
        </button>
    );
}