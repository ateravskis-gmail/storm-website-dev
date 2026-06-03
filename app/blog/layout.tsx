import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights on SWPPP writing, stormwater compliance, and digital transformation from the Storm team.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog | Storm',
    description:
      'Insights on SWPPP writing, stormwater compliance, and digital transformation from the Storm team.',
    url: `${siteConfig.url}/blog`,
    type: 'website',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Storm Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Storm',
    description:
      'Insights on SWPPP writing, stormwater compliance, and digital transformation from the Storm team.',
    images: [siteConfig.ogImage],
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
