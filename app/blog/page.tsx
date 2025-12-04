'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// Helper function to extract Vimeo video ID and get thumbnail URL
const getVimeoThumbnail = (url: string | null): string | null => {
  if (!url) return null
  
  // Try /video/ format first
  let match = url.match(/\/video\/(\d+)/)
  if (!match) {
    // Try direct vimeo.com/ID format
    match = url.match(/vimeo\.com\/(\d+)/)
  }
  
  if (match && match[1]) {
    // Use vumbnail.com service for Vimeo thumbnails
    return `https://vumbnail.com/${match[1]}.jpg`
  }
  
  return null
}

const blogPosts = [
  {
    slug: 'casqa-swppp-template-gold-standard',
    title: 'Thoughts on the "Gold Standard" of SWPPP templates',
    excerpt: 'A practical perspective on the CASQA CGP SWPPP template for QSDs and stormwater professionals',
    videoUrl: null,
    date: '2025',
  },
  {
    slug: 'swppp-mapping-prototype',
    title: 'Building the Future of SWPPP Mapping: A First Look at The New Prototype',
    excerpt: 'I\'ve been quietly working on something I\'ve wanted for years—a modern, intuitive, actually-nice-to-use tool for creating SWPPP site maps.',
    videoUrl: null,
    date: '2025',
  },
  {
    slug: 'digital-transformation-stormwater-industry',
    title: 'Digital Transformation in the Stormwater Industry',
    excerpt: 'Stormwater Compliance Was Built on the Wrong Foundation — And It\'s Time We Fix It',
    videoUrl: 'https://vimeo.com/1122303387',
    date: '2025',
  },
  {
    slug: 'ai-slop-armageddon',
    title: 'AI Slop Armageddon: Ensuring Quality and Accuracy in the Age of Armageddon',
    excerpt: 'AI has never moved faster than it is right now. Every month brings a breakthrough, a new model, or a new capability that seemed impossible just a year ago.',
    videoUrl: 'https://vimeo.com/1122303387',
    date: '2025',
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-storm-light via-white to-storm-light">
      <Navbar forceScrolled />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-gradient">Storm Blog</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Insights, workshops, and updates on stormwater compliance and digital transformation
            </p>
          </motion.div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
              >
                <Link href={`/blog/${post.slug}`}>
                  {/* Video Thumbnail or Image */}
                  {post.videoUrl ? (
                    <div className="relative aspect-video bg-gradient-to-br from-storm-primary to-storm-secondary overflow-hidden">
                      {getVimeoThumbnail(post.videoUrl) ? (
                        <>
                          <Image
                            src={getVimeoThumbnail(post.videoUrl)!}
                            alt={post.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                              <svg
                                className="w-10 h-10 text-white ml-1"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                          <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                            Watch Video
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                              <svg
                                className="w-10 h-10 text-white ml-1"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                          <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                            Watch Video
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="relative aspect-video bg-gradient-to-br from-storm-primary/10 to-storm-secondary/10 overflow-hidden">
                      {post.slug === 'swppp-mapping-prototype' ? (
                        <Image
                          src="/MappingProto1.png"
                          alt={post.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : post.slug === 'casqa-swppp-template-gold-standard' ? (
                        <Image
                          src="/70 pages and 700 pages.png"
                          alt={post.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-storm-primary text-4xl font-bold opacity-20">
                            {post.title.charAt(0)}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-8">
                    <div className="text-sm text-gray-500 mb-3">{post.date}</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 hover:text-storm-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src="/1743179351400.jpeg"
                            alt="Andrew Teravskis"
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                            unoptimized
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">
                            Andrew Teravskis
                          </div>
                          <div className="text-gray-500 text-xs">
                            Founder and CEO, Storm
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center text-storm-primary font-semibold group">
                        Read more
                        <svg
                          className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

