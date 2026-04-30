"use client";

// Receives fully-resolved post data from the server component.
// No @/lib/sanity import — PortableText comes from @portabletext/react directly.

import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { useTheme } from "@/components/ThemeProvider";

export interface PostData {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  category: string;
  publishedAt: string;
  imageUrl: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[];
  cta?: { text: string; href: string };
}

export default function BlogPostUI({ post }: { post: PostData | null }) {
  const { theme } = useTheme();

  if (!post) {
    return (
      <div
        className="min-h-screen pt-32 flex flex-col items-center justify-center"
        style={{ backgroundColor: theme === "dark" ? "#0B0F1A" : "#FFFFFF" }}
      >
        <h1
          className="text-2xl font-bold mb-4"
          style={{ color: theme === "dark" ? "#3DCFED" : "#0D1F6E" }}
        >
          Post not found
        </h1>
        <Link href="/blog" className="text-cyan-400 hover:text-cyan-300">
          &larr; Back to blog
        </Link>
      </div>
    );
  }

  return (
    <article
      className="min-h-screen pt-32 pb-20 transition-colors duration-300"
      style={{ backgroundColor: theme === "dark" ? "#0B0F1A" : "#FFFFFF" }}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/blog"
          className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          &larr; Back to blog
        </Link>

        {/* Header */}
        <div className="mt-8">
          {post.category && (
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{
                backgroundColor:
                  theme === "dark"
                    ? "rgba(61,207,237,0.1)"
                    : "rgba(26,60,200,0.1)",
                color: "#3DCFED",
              }}
            >
              {post.category}
            </span>
          )}

          <h1
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
            style={{ color: theme === "dark" ? "#3DCFED" : "#0D1F6E" }}
          >
            {post.title}
          </h1>

          {post.publishedAt && (
            <p
              className="mt-4 text-sm"
              style={{ color: theme === "dark" ? "#6B7280" : "#9CA3AF" }}
            >
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          )}
        </div>

        {/* Featured image */}
        {post.imageUrl && (
          <div className="mt-8 rounded-xl overflow-hidden relative h-64 sm:h-80">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Body content */}
        {post.body && (
          <div
            className="mt-10 prose prose-lg max-w-none"
            style={{ color: theme === "dark" ? "#D1D5DB" : "#4B5563" }}
          >
            <style>{`
              .prose h2 { color: ${theme === "dark" ? "#3DCFED" : "#0D1F6E"}; font-weight: 700; margin-top: 2em; margin-bottom: 0.5em; font-size: 1.5rem; }
              .prose h3 { color: ${theme === "dark" ? "#3DCFED" : "#0D1F6E"}; font-weight: 600; margin-top: 1.5em; margin-bottom: 0.5em; font-size: 1.25rem; }
              .prose p { margin-bottom: 1.25em; line-height: 1.75; }
              .prose a { color: #3DCFED; text-decoration: underline; }
              .prose ul, .prose ol { margin-bottom: 1.25em; padding-left: 1.5em; }
              .prose li { margin-bottom: 0.5em; }
              .prose blockquote { border-left: 3px solid #3DCFED; padding-left: 1em; font-style: italic; color: ${theme === "dark" ? "#9CA3AF" : "#6B7280"}; }
              .prose strong { color: ${theme === "dark" ? "#EAF4FF" : "#111827"}; }
            `}</style>
            <PortableText value={post.body} />
          </div>
        )}

        {/* CTA */}
        {post.cta?.text && post.cta?.href && (
          <div
            className="mt-12 rounded-2xl p-8 text-center"
            style={{
              background:
                theme === "dark"
                  ? "linear-gradient(135deg, rgba(61,207,237,0.08), rgba(26,60,200,0.08))"
                  : "linear-gradient(135deg, rgba(61,207,237,0.06), rgba(26,60,200,0.06))",
              border: "1px solid rgba(61,207,237,0.2)",
            }}
          >
            <p
              className="text-sm font-medium mb-4"
              style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}
            >
              Ready to take the next step?
            </p>
            <Link
              href={post.cta.href}
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #3DCFED, #1A3CC8)" }}
            >
              {post.cta.text} →
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
