"use client";
export default function Error({ reset }: { reset: () => void }) {
    return (
        <div className="p-8">
            <p>加载失败，请重试</p>
            <button onClick={reset} className="text-blue-500">重试</button>
        </div>
    );
}