export const siteConfig = {
  name: 'Storm',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://getstorm.io',
  title: 'Storm - Write Construction SWPPPs Faster & Smarter',
  description:
    'Streamline your Storm Water Pollution Prevention Plan writing with Storm. Professional, compliant SWPPPs for civil engineers, QSDs, and stormwater consultants.',
  ogImage: '/og-image.png',
  logo: '/storm-logo.png',
  author: {
    name: 'Andrew Teravskis',
    title: 'Founder and CEO, Storm',
    image: '/1743179351400.jpeg',
  },
}

export function isProductionSite(): boolean {
  if (process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true') return true
  if (process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'false') return false
  return process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production'
}
