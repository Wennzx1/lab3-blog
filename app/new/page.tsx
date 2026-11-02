import { getCategories } from "@/lib/posts";
import NewPostForm from "./NewPostForm";

export default async function NewPostPage() {
    const categories = await getCategories();
    return <NewPostForm categories={categories} />;
}