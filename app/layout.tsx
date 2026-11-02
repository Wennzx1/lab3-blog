import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Providers from "./Providers";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "我的博客",
  description: "用Next.js做的全栈博客",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <nav className="p-4 border-b flex gap-4">
          <Link href="/">首页</Link>
          <Link href="/about">关于</Link>
          <Link href="/new">写文章</Link>
        </nav>
        <Providers>
          <main className="max-w-2xl mx-auto p-4">
            {children}
          </main>
        </Providers>
        <footer className="text-center p-4 text-sm text-gray-500">© 2026 我的博客</footer>
      </body>
    </html>
  );

}
