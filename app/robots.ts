import type { MetadataRoute } from 'next'
import { isProductionSite, siteConfig } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  if (isProductionSite()) {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
      },
      sitemap: `${siteConfig.url}/sitemap.xml`,
    }
  }

  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
