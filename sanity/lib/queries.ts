// Blog posts
export const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  category,
  mainImage,
  body
}`;

export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  category,
  mainImage,
  body
}`;

// Team members
export const TEAM_QUERY = `*[_type == "teamMember"] | order(order asc) {
  _id,
  name,
  role,
  bio,
  photo,
  order
}`;

// Services
export const SERVICES_QUERY = `*[_type == "service"] | order(order asc) {
  _id,
  name,
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
