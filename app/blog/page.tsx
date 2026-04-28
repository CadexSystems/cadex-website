import { sanityClient, BLOG_POSTS_QUERY } from "@/lib/sanity";
import BlogClient from "./BlogClient";

const PLACEHOLDER_POSTS = [
  {
    slug: "getting-started-with-ai-automation",
    title: "Getting Started with AI Automation: What Every Business Leader Needs to Know",
    excerpt:
      "AI automation isn't about replacing your team — it's about freeing them to do their best work. Here's how to get started.",
    date: "Coming Soon",
    category: "AI Strategy",
  },
  {
    slug: "measuring-roi-on-ai-investments",
    title: "How to Measure ROI on AI Investments (Without the Guesswork)",
    excerpt:
      "Most companies can't tell you if their AI investments are paying off. We break down the KPI framework that makes it clear.",
    date: "Coming Soon",
    category: "ROI & Analytics",
  },
  {
    slug: "ai-readiness-assessment",
    title: "Is Your Business AI-Ready? A Practical Assessment Framework",
    excerpt:
      "Before you invest in AI tools, you need to know where you stand. Use this framework to assess your organization's readiness.",
    date: "Coming Soon",
    category: "Getting Started",
  },
];

export const revalidate = 60; // revalidate every 60 seconds

export default async function BlogPage() {
  let posts = [];
  try {
    posts = await sanityClient.fetch(BLOG_POSTS_QUERY);
  } catch {
    // Fall through to placeholder posts
  }

  return <BlogClient posts={posts || []} placeholderPosts={PLACEHOLDER_POSTS} />;
}
