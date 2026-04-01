"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { sanityClient, BLOG_POST_QUERY, urlFor } from "@/lib/sanity";
import { PortableText } from "next-sanity";

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  category: string;
  publishedAt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mainImage: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[];
  cta?: { text: string; href: string };
}

export default function BlogPostPage() {
  const { theme } = useTheme();
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.slug) {
      sanityClient
        .fetch(BLOG_POST_QUERY, { slug: params.slug })
        .then((data: BlogPost) => {
          setPost(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div
        className="min-h-screen pt-32 flex items-center justify-center"
        style={{ backgroundColor: theme === "dark" ? "#0B0F1A" : "#FFFFFF" }}
      >
        <p style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}>
          Loading...
        </p>
      </div>
    );
  }

  if (!post) {
    return (
      <div
        className="min-h-screen pt-32 flex flex-col items-center justify-center"
        style={{ backgroundColor: theme === "dark" ? "#0B0F1A" : "#FFFFFF" }}
      >
        <h1
          className="text-2xl font-bold mb-4"
          style={{ color: theme === "dark" ? "#4FE0FF" : "#0A3D7C" }}
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
                    ? "rgba(79,224,255,0.1)"
                    : "rgba(30,143,225,0.1)",
                color: "#4FE0FF",
              }}
            >
              {post.category}
            </span>
          )}

          <h1
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
            style={{ color: theme === "dark" ? "#4FE0FF" : "#0A3D7C" }}
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
        {post.mainImage && (
          <div className="mt-8 rounded-xl overflow-hidden relative h-64 sm:h-80">
            <Image
              src={urlFor(post.mainImage).width(800).height(400).url()}
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
            style={{
              color: theme === "dark" ? "#D1D5DB" : "#4B5563",
            }}
          >
            <style>{`
              .prose h2 { color: ${theme === "dark" ? "#4FE0FF" : "#0A3D7C"}; font-weight: 700; margin-top: 2em; margin-bottom: 0.5em; font-size: 1.5rem; }
              .prose h3 { color: ${theme === "dark" ? "#4FE0FF" : "#0A3D7C"}; font-weight: 600; margin-top: 1.5em; margin-bottom: 0.5em; font-size: 1.25rem; }
              .prose p { margin-bottom: 1.25em; line-height: 1.75; }
              .prose a { color: #4FE0FF; text-decoration: underline; }
              .prose ul, .prose ol { margin-bottom: 1.25em; padding-left: 1.5em; }
              .prose li { margin-bottom: 0.5em; }
              .prose blockquote { border-left: 3px solid #4FE0FF; padding-left: 1em; font-style: italic; color: ${theme === "dark" ? "#9CA3AF" : "#6B7280"}; }
              .prose strong { color: ${theme === "dark" ? "#F9FAFB" : "#111827"}; }
            `}</style>
            <PortableText value={post.body} />
          </div>
        )}

        {/* CTA */}
        {post.cta?.text && post.cta?.href && (
          <div
            className="mt-12 rounded-2xl p-8 text-center"
            style={{
              background: theme === "dark"
                ? "linear-gradient(135deg, rgba(79,224,255,0.08), rgba(30,143,225,0.08))"
                : "linear-gradient(135deg, rgba(79,224,255,0.06), rgba(30,143,225,0.06))",
              border: "1px solid rgba(79,224,255,0.2)",
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
              style={{ background: "linear-gradient(135deg, #4FE0FF, #1E8FE1)" }}
            >
              {post.cta.text} →
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
