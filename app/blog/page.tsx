"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import CTASection from "@/components/CTASection";
import { sanityClient, BLOG_POSTS_QUERY, urlFor } from "@/lib/sanity";
import { useEffect, useState } from "react";

interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  category: string;
  publishedAt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mainImage: any;
}

const PLACEHOLDER_POSTS = [
  {
    slug: "getting-started-with-ai-automation",
    title: "Getting Started with AI Automation: What Every Business Leader Needs to Know",
    excerpt:
      "AI automation isn\u2019t about replacing your team \u2014 it\u2019s about freeing them to do their best work. Here\u2019s how to get started.",
    date: "Coming Soon",
    category: "AI Strategy",
  },
  {
    slug: "measuring-roi-on-ai-investments",
    title: "How to Measure ROI on AI Investments (Without the Guesswork)",
    excerpt:
      "Most companies can\u2019t tell you if their AI investments are paying off. We break down the KPI framework that makes it clear.",
    date: "Coming Soon",
    category: "ROI & Analytics",
  },
  {
    slug: "ai-readiness-assessment",
    title: "Is Your Business AI-Ready? A Practical Assessment Framework",
    excerpt:
      "Before you invest in AI tools, you need to know where you stand. Use this framework to assess your organization\u2019s readiness.",
    date: "Coming Soon",
    category: "Getting Started",
  },
];

export default function BlogPage() {
  const { theme } = useTheme();
  const [posts, setPosts] = useState<SanityPost[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    sanityClient.fetch(BLOG_POSTS_QUERY).then((data: SanityPost[]) => {
      setPosts(data || []);
      setLoaded(true);
    }).catch(() => setLoaded(true));
  }, []);

  const hasSanityPosts = loaded && posts.length > 0;

  return (
    <>
      <section
        className="pt-32 pb-20 min-h-screen transition-colors duration-300"
        style={{ backgroundColor: theme === "dark" ? "#0B0F1A" : "#FFFFFF" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1
              className="text-4xl sm:text-5xl font-bold"
              style={{ color: theme === "dark" ? "#4FE0FF" : "#0A3D7C" }}
            >
              Insights & Resources
            </h1>
            <p
              className="mt-4 text-lg max-w-2xl mx-auto"
              style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}
            >
              Practical insights on AI automation, implementation strategy, and
              measurable business outcomes.
            </p>
          </div>

          {hasSanityPosts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                >
                  <article
                    className="rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full"
                    style={{
                      backgroundColor: theme === "dark" ? "#1A2235" : "#FFFFFF",
                      border: `1px solid ${theme === "dark" ? "#243049" : "#E5E7EB"}`,
                    }}
                  >
                    {post.mainImage ? (
                      <div className="h-48 relative">
                        <Image
                          src={urlFor(post.mainImage).width(600).height(300).url()}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className="h-48"
                        style={{
                          backgroundColor: theme === "dark" ? "#243049" : "#E5E7EB",
                        }}
                      />
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
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
                        {post.publishedAt && (
                          <span
                            className="text-xs"
                            style={{
                              color: theme === "dark" ? "#6B7280" : "#9CA3AF",
                            }}
                          >
                            {new Date(post.publishedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        )}
                      </div>
                      <h2
                        className="text-lg font-bold mb-2"
                        style={{
                          color: theme === "dark" ? "#4FE0FF" : "#0A3D7C",
                        }}
                      >
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p
                          className="text-sm"
                          style={{
                            color: theme === "dark" ? "#9CA3AF" : "#6B7280",
                          }}
                        >
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PLACEHOLDER_POSTS.map((post) => (
                  <article
                    key={post.slug}
                    className="rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    style={{
                      backgroundColor: theme === "dark" ? "#1A2235" : "#FFFFFF",
                      border: `1px solid ${theme === "dark" ? "#243049" : "#E5E7EB"}`,
                    }}
                  >
                    <div
                      className="h-40"
                      style={{
                        backgroundColor: theme === "dark" ? "#243049" : "#E5E7EB",
                      }}
                    />
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
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
                        <span
                          className="text-xs"
                          style={{
                            color: theme === "dark" ? "#6B7280" : "#9CA3AF",
                          }}
                        >
                          {post.date}
                        </span>
                      </div>
                      <h2
                        className="text-lg font-bold mb-2"
                        style={{
                          color: theme === "dark" ? "#4FE0FF" : "#0A3D7C",
                        }}
                      >
                        {post.title}
                      </h2>
                      <p
                        className="text-sm"
                        style={{
                          color: theme === "dark" ? "#9CA3AF" : "#6B7280",
                        }}
                      >
                        {post.excerpt}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="text-center mt-12">
                <p
                  className="text-sm"
                  style={{ color: theme === "dark" ? "#6B7280" : "#9CA3AF" }}
                >
                  More content coming soon. Stay tuned.
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
