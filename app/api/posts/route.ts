import { getPosts } from "@/lib/posts";

export async function GET(request: Request) {
    const category = new URL(request.url).searchParams.get("category") || undefined;
    return Response.json(await getPosts(category));
}