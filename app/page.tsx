import { getPosts, getCategories } from "@/lib/posts";
import RemotePosts from "../components/RemotePosts";

export default async function HomePage() {
  const posts = await getPosts();
  const categories = await getCategories();
  const listKey = posts.map(p => p.id).join("-");   // 数据变了就重新挂载列表
  return <RemotePosts key={listKey} categories={categories} initialPosts={posts} />;
}