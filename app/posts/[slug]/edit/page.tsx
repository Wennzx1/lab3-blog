import { getPost } from "@/lib/posts";
import { editPost } from "@/app/actions";
export const instant = false;   // 编辑页要先用 slug 回填，允许阻塞

export default async function EditPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) return <p>文章不存在</p>;
    return (
        <form action={editPost}>
            <input type="hidden" name="slug" value={post.slug} />
            <input name="title" defaultValue={post.title} className="border p-2 block w-full mb-2" />
            <textarea name="content" defaultValue={post.content} className="border p-2 block w-full mb-2" />
            <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600">保存修改</button>
            <p className="text-sm text-gray-500 mt-2">保存后会自动返回首页。</p>
        </form>
    );
}