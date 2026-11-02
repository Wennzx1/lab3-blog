import { getPost, getPosts } from "@/lib/posts";
export const instant = false;   // 允许阻塞：详情页要先拿到 slug 才能渲染
import LikeButton from "@/components/LikeButton";
import { removePost } from "@/app/actions";
import { Suspense } from "react";
import Comments from "@/components/Comments";


export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map(p => ({ slug: p.slug }));

}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;   // Next.js 16：params是Promise
    const post = await getPost(slug);
    if (!post) return <p>文章不存在</p>;
    return (
        <article className="space-y-4">
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <p className="text-sm text-gray-500">{post.category} · {post.publishedAt}</p>
            <p>{post.content}</p>
            <form action={removePost}>
                <input type="hidden" name="slug" value={post.slug} />
                <button className="text-red-600 cursor-pointer hover:underline">删除本文</button>
            </form>
            <a href={`/posts/${post.slug}/edit`}>编辑本文</a>
            <Suspense fallback={<p>评论加载中…</p>}>
                <Comments />
            </Suspense>
        </article>

    );


}
