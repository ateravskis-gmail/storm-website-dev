import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/lib/blog-posts'
import BlogPostClient from './BlogPostClient'

type PageProps = {
  params: { slug: string }
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return <BlogPostClient post={post} />
}
