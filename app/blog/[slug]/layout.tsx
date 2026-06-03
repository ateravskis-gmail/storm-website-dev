import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { getPostBySlug, getPostOgImage, getAllSlugs } from '@/lib/blog-posts'
import { siteConfig } from '@/lib/site'

type LayoutProps = {
  children: React.ReactNode
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const ogImage = getPostOgImage(post)
  const canonical = `/blog/${post.slug}`

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteConfig.url}${canonical}`,
      type: 'article',
      publishedTime: post.datePublished,
      authors: [siteConfig.author.name],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  }
}

export default function BlogPostLayout({ children, params }: LayoutProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return children
  }

  const ogImage = getPostOgImage(post)
  const postUrl = `${siteConfig.url}/blog/${post.slug}`

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.datePublished,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      jobTitle: siteConfig.author.title,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}${siteConfig.logo}`,
      },
    },
    image: ogImage.startsWith('http') ? ogImage : `${siteConfig.url}${ogImage}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteConfig.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteConfig.url}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  }

  return (
    <>
      <JsonLd data={[blogPostingSchema, breadcrumbSchema]} />
      {children}
    </>
  )
}
