// Server Component — data is fetched here so the full HTML reaches crawlers.
// Theme-aware rendering is handled by BlogListUI (client component that receives plain data).

import { sanityClient, BLOG_POSTS_QUERY, urlFor } from "@/lib/sanity";
import type { SanityImageSource } from "@sanity/image-url";
import BlogListUI, { PostData } from "./BlogListUI";
import CTASection from "@/components/CTASection";

// Re-fetch from Sanity at most once per hour so new posts appear without redeployment.
export const revalidate = 3600;

type RawPost = PostData & { mainImage: SanityImageSource | null };

export default async function BlogPage() {
  let posts: PostData[] = [];

  try {
    const raw: RawPost[] = await sanityClient.fetch(BLOG_POSTS_QUERY);
    posts = (raw || []).map((p) => ({
      _id: p._id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      category: p.category,
      publishedAt: p.publishedAt,
      imageUrl: p.mainImage
        ? urlFor(p.mainImage).width(600).height(300).url()
        : null,
    }));
  } catch (err) {
    console.error("[blog/page] Sanity fetch failed:", err);
    // Fall through — BlogListUI will render placeholder posts
  }

  return (
    <>
      <BlogListUI posts={posts} />
      <CTASection />
    </>
  );
}
