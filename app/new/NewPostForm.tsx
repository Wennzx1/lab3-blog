"use client";
import { useActionState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createPost } from "../actions";

const initialState = { ok: false, error: "" };

export default function NewPostForm({ categories }: { categories: string[] }) {
    const [state, formAction, isPending] = useActionState(createPost, initialState);
    const queryClient = useQueryClient();
    const router = useRouter();

    useEffect(() => {
        if (state.ok) {
            queryClient.invalidateQueries({ queryKey: ["posts"], refetchType: "all" });
            router.refresh();
        }
    }, [state, queryClient, router]);

    const options = categories.filter(c => c !== "全部");

    return (
        <form action={formAction}>
            <input name="title" placeholder="标题" className="border p-2 block w-full mb-2" />
            <textarea name="content" placeholder="正文" className="border p-2 block w-full mb-2" />
            <select name="category" defaultValue={options[0] ?? "技术"} className="border p-2 block w-full mb-2">
                {options.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {state.error && <p className="text-red-600 mb-2">{state.error}</p>}
            <button disabled={isPending} className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed">
                {isPending ? "发布中..." : "发布"}
            </button>
        </form>
    );
}