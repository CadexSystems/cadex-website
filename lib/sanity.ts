import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: "kyfypmfi",
  dataset: "production",
  apiVersion: "2026-03-26",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}

// GROQ queries — field names match the Sanity Studio schemas

export const BLOG_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  category,
  publishedAt,
  mainImage
}`;

export const BLOG_POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  category,
  publishedAt,
  mainImage,
  body
}`;

export const SERVICES_QUERY = `*[_type == "service"] | order(order asc) {
  _id,
  tierLabel,
  title,
  description,
  setupFee,
  monthlyRetainer,
  commitment,
  setupIncludes,
  monthlyIncludes,
  engagementTypes,
  accentColor,
  order
}`;

export const TEAM_MEMBERS_QUERY = `*[_type == "teamMember"] | order(order asc) {
  _id,
  name,
  role,
  bio,
  photo
}`;
