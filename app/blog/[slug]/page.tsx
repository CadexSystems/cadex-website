// Server Component — full post content is SSR'd so every crawler and LLM
// can read the entire article body without JavaScript.

import type { Metadata } from "next";
import { sanityClient, BLOG_POST_QUERY, urlFor } from "@/lib/sanity";
import type { SanityImageSource } from "@sanity/image-url";
import BlogPostUI, { PostData } from "./BlogPostUI";

// Re-fetch from Sanity at most once per hour so edits appear without redeployment.
export const revalidate = 3600;

type RawPost = PostData & { mainImage: SanityImageSource | null };

// ── Per-post SEO metadata ──────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post: RawPost = await sanityClient.fetch(BLOG_POST_QUERY, { slug });
    if (post) {
      return {
        title: `${post.title} | Cadex Systems`,
        description: post.excerpt || undefined,
        alternates: { canonical: `https://www.cadexhq.com/blog/${slug}` },
        openGraph: {
          title: post.title,
          description: post.excerpt || undefined,
          images: post.mainImage
            ? [urlFor(post.mainImage).width(1200).height(630).url()]
            : undefined,
        },
      };
    }
  } catch (err) {
    console.error("[blog/[slug]] generateMetadata fetch failed:", err);
  }
  return { title: "Blog | Cadex Systems" };
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post: PostData | null = null;

  try {
    const raw: RawPost = await sanityClient.fetch(BLOG_POST_QUERY, { slug });
    if (raw) {
      post = {
        _id: raw._id,
        title: raw.title,
        slug: raw.slug,
        excerpt: raw.excerpt,
        category: raw.category,
        publishedAt: raw.publishedAt,
        imageUrl: raw.mainImage
          ? urlFor(raw.mainImage).width(800).height(400).url()
          : null,
        body: raw.body,
        cta: raw.cta,
      };
    }
  } catch (err) {
    console.error(`[blog/[slug]] Sanity fetch failed for slug "${slug}":`, err);
    // Fall through — BlogPostUI renders a "not found" state
  }

  return <BlogPostUI post={post} />;
}
