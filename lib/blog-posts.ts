import { siteConfig } from './site'

export type BlogPostMeta = {
  slug: string
  title: string
  excerpt: string
  videoUrl: string | null
  datePublished: string
  images?: string[]
}

export const blogPosts: BlogPostMeta[] = [
  {
    slug: 'casqa-swppp-template-gold-standard',
    title: 'Thoughts on the "Gold Standard" of SWPPP templates',
    excerpt:
      'A practical perspective on the CASQA CGP SWPPP template for QSDs and stormwater professionals',
    videoUrl: null,
    datePublished: '2025-01-15',
    images: ['/70 pages and 700 pages.png'],
  },
  {
    slug: 'swppp-mapping-prototype',
    title: 'Building the Future of SWPPP Mapping: A First Look at The New Prototype',
    excerpt:
      "I've been quietly working on something I've wanted for years—a modern, intuitive, actually-nice-to-use tool for creating SWPPP site maps.",
    videoUrl: null,
    datePublished: '2025-02-01',
    images: [
      '/MappingProto1.png',
      '/MappingProto2.png',
      '/MappingProto3.png',
      '/MappingProto4.png',
    ],
  },
  {
    slug: 'digital-transformation-stormwater-industry',
    title: 'Digital Transformation in the Stormwater Industry',
    excerpt:
      "Stormwater Compliance Was Built on the Wrong Foundation — And It's Time We Fix It",
    videoUrl: 'https://vimeo.com/1122303387',
    datePublished: '2025-03-01',
  },
  {
    slug: 'ai-slop-armageddon',
    title: 'AI Slop Armageddon: Ensuring Quality and Accuracy in the Age of Armageddon',
    excerpt:
      'AI has never moved faster than it is right now. Every month brings a breakthrough, a new model, or a new capability that seemed impossible just a year ago.',
    videoUrl: 'https://vimeo.com/1122303387',
    datePublished: '2025-04-01',
  },
]

export function getAllPosts(): BlogPostMeta[] {
  return blogPosts
}

export function getPostBySlug(slug: string): BlogPostMeta | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getAllSlugs(): string[] {
  return blogPosts.map((post) => post.slug)
}

export function getVimeoThumbnail(url: string | null): string | null {
  if (!url) return null

  let match = url.match(/\/video\/(\d+)/)
  if (!match) {
    match = url.match(/vimeo\.com\/(\d+)/)
  }

  if (match?.[1]) {
    return `https://vumbnail.com/${match[1]}.jpg`
  }

  return null
}

export function getPostOgImage(post: BlogPostMeta): string {
  const vimeoThumb = getVimeoThumbnail(post.videoUrl)
  if (vimeoThumb) return vimeoThumb
  if (post.images?.[0]) return post.images[0]
  return siteConfig.ogImage
}

export function formatPostDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
