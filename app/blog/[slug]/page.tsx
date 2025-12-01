'use client'

import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import VideoModal from '@/components/VideoModal'
import { useState } from 'react'
import Link from 'next/link'

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

function MappingPostContent({ images }: { images: string[] }) {
  const content = [
    {
      type: 'paragraph',
      text: "Storm has been quietly working on something I've wanted for years—a modern, intuitive, actually-nice-to-use tool for creating SWPPP site maps. Not something built in GIS, and not something as overwhelming as CAD. I'm talking about a purpose-built mapping interface designed specifically for stormwater BMPs and SWPPP plans.",
    },
    {
      type: 'paragraph',
      text: "Today, I get to share with you a behind-the-scenes look at a prototype mapping tool and tell you why I think it will change how fast SWPPPs can be prepared.",
    },
    {
      type: 'heading',
      text: 'Why A New Mapping Tool is Needed',
    },
    {
      type: 'paragraph',
      text: "If you've been in the stormwater business a while, you know the pain:",
    },
    {
      type: 'list',
      items: [
        'Every SWPPP map looks different.',
        'BMP symbols are inconsistent across consultants.',
        'CAD softwares are cumbersome, way overkill, and just too much for most stormwater consultants.',
        'And Microsoft Word just… isn\'t cut out for the job.',
      ],
    },
    {
      type: 'paragraph',
      text: 'I kept asking myself: What would a purpose-built SWPPP mapping app look like if we started from scratch? A fast, modern, web-based tool that understands BMPs, layers, and take-offs, allout of the box.',
    },
    {
      type: 'paragraph',
      text: 'So here we are.',
    },
    {
      type: 'heading',
      text: 'The Vision: A Modern Web-Based CAD for BMPs',
    },
    {
      type: 'paragraph',
      text: 'The core idea is simple:',
    },
    {
      type: 'paragraph',
      text: 'Let users draw BMPs on a plan with the ease of a native drawing software, but with the structure and intelligence of CAD.',
    },
    {
      type: 'paragraph',
      text: "I won't bore you with the technical stuff, but the prototype involves the CAD features that most stormwater consultants actually need when creating a SWPP map: angles, measurements, offsets, snapping to endpoints and midpoints, and more. But it also includes robust drawing tools that will be familiar to anyone who's spent time in professional drawing platforms.",
    },
    {
      type: 'image',
      src: images[0] || '', // Storm Mapping Prototype interface
      alt: 'Storm Mapping Prototype Interface',
      size: 'large', // Full width for featured interface
    },
    {
      type: 'heading',
      text: 'BMPs: More than Dashed Lines',
    },
    {
      type: 'paragraph',
      text: 'This is the really fun part.',
    },
    {
      type: 'paragraph',
      text: "One of the things I've always been annoyed with is how generic everything looks. A fiber roll is a yellow line. A silt fence is a dashed line. Nothing is recognizable at a glance.",
    },
    {
      type: 'paragraph',
      text: 'So our BMP object styles are built to be recognizable:',
    },
    {
      type: 'list',
      items: [
        'Fiber rolls: tan, rounded ends, subtle hatch texture that follows the path',
        'Silt fence: clean black line with a small repeating "picket" pattern',
        'Construction entrances: aggregate texture along the vector',
        'Inlets, check dams, basins: vector symbols with metadata baked in',
      ],
    },
    {
      type: 'image',
      src: images[3] || '', // Erosion Controls dropdown
      alt: 'Erosion Controls Menu',
      size: 'medium', // Smaller inset for dropdown
    },
    {
      type: 'paragraph',
      text: 'These look like what civil engineers draw in CAD—but clean, modern, and web-ready.',
    },
    {
      type: 'image',
      src: images[1] || '', // Technical drawing/map view
      alt: 'SWPPP Map with BMPs',
      size: 'medium', // Smaller inset for map view
    },
    {
      type: 'heading',
      text: 'The Takeoff System (My Favorite Part)',
    },
    {
      type: 'paragraph',
      text: 'Because all BMPs are objects, not just drawings, the app automatically generates a materials list:',
    },
    {
      type: 'list',
      items: [
        'Total linear feet of fiber roll',
        'Linear feet of silt fence',
        'Number of inlet protections',
        'Rock quantities for construction entrances',
        'Hydromulch square footage',
      ],
    },
    {
      type: 'paragraph',
      text: 'This has not been easy in the PDF/CAD hybrid world. But here, it\'s automatic.',
    },
    {
      type: 'image',
      src: images[2] || '', // Materials Takeoff Dashboard
      alt: 'Materials Takeoff Dashboard',
      size: 'medium', // Smaller inset for dashboard
    },
    {
      type: 'heading',
      text: "What's Next?",
    },
    {
      type: 'paragraph',
      text: "Finishing the core drawing engine, lots of testing, and integrating the following features:",
    },
    {
      type: 'list',
      items: [
        'layer management',
        'export to PDF (with proper scale)',
        'automatic map legend generation',
        'integration into Storm, so BMPs specced on the map automatically appear in the BMPs narrative',
      ],
    },
    {
      type: 'paragraph',
      text: 'The long-term goal is to bring the entire SWPPP creation workflow under one roof.',
    },
    {
      type: 'heading',
      text: 'Why This Matters',
    },
    {
      type: 'paragraph',
      text: "If you're a QSP/QSD, inspector, civil engineer, or contractor, you know how painful SWPPP creation can be. Drawing BMPs shouldn't take longer than writing the plan. It shouldn't require expensive software. And it shouldn't look sloppy.",
    },
    {
      type: 'paragraph',
      text: 'This prototype is an attempt to fix that.',
    },
    {
      type: 'paragraph',
      text: 'A clean, modern, cloud-based drawing tool—purpose-built for BMPs.',
    },
    {
      type: 'paragraph',
      text: "I can't wait to show the first official release - coming soon!",
    },
  ]

  return (
    <>
      {content.map((item, index) => {
        if (item.type === 'paragraph') {
          return (
            <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg">
              {item.text}
            </p>
          )
        }
        if (item.type === 'heading') {
          return (
            <h2 key={index} className="text-3xl font-bold text-gray-900 mt-12 mb-6 first:mt-0">
              {item.text}
            </h2>
          )
        }
        if (item.type === 'list' && item.items) {
          return (
            <ul key={index} className="list-disc list-inside mb-6 space-y-2 text-gray-700 text-lg">
              {item.items.map((listItem, listIndex) => (
                <li key={listIndex} className="leading-relaxed">{listItem}</li>
              ))}
            </ul>
          )
        }
        if (item.type === 'image' && item.src) {
          const isLarge = (item as any).size === 'large'
          return (
            <div 
              key={index} 
              className={`my-12 rounded-xl overflow-hidden shadow-xl ${
                isLarge ? 'w-full' : 'max-w-2xl mx-auto'
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={1200}
                height={800}
                className="w-full h-auto"
                unoptimized
              />
            </div>
          )
        }
        return null
      })}
    </>
  )
}

const blogPosts: Record<string, {
  title: string
  videoUrl: string | null
  content: string | React.ReactNode
  date: string
  images?: string[]
}> = {
  'swppp-mapping-prototype': {
    title: 'Building the Future of SWPPP Mapping: A First Look at The New Prototype',
    videoUrl: null,
    date: '2025',
    images: [
      '/MappingProto1.png', // Storm Mapping Prototype interface (featured)
      '/MappingProto2.png', // Technical drawing/map view
      '/MappingProto3.png', // Materials Takeoff Dashboard
      '/MappingProto4.png', // Erosion Controls dropdown
    ],
    content: 'swppp-mapping-prototype-content',
  },
  'digital-transformation-stormwater-industry': {
    title: 'Digital Transformation in the Stormwater Industry',
    videoUrl: 'https://vimeo.com/1122303387',
    date: '2025',
    content: `Stormwater Compliance Was Built on the Wrong Foundation — And It's Time We Fix It

Here's a truth I've learned after spending years in the stormwater industry:

Our entire stormwater compliance system was built on a foundation that no longer exists.

And I don't mean the regulations — I mean the technology layer underneath them.

Through no fault of its own, the stormwater industry got swept up in the evolution of office culture and early computing. What started as a harmless metaphor — "files," "folders," "desktops," "documents" — quietly dictated how environmental compliance would operate for decades.

For a long time, it didn't look like a problem. Regulations were simpler, documents were shorter, and version control wasn't the monster it is today. But as rules became more complex and as teams became more distributed, the gap between regulatory intent and the tools we were given became painfully clear.

In this post, I want to walk you through how we got here — and why we're standing on the edge of a necessary reinvention.`,
  },
  'ai-slop-armageddon': {
    title: 'AI Slop Armageddon: Ensuring Quality and Accuracy in the Age of Armageddon',
    videoUrl: 'https://vimeo.com/1122303387',
    date: '2025',
    content: `AI has never moved faster than it is right now. Every month brings a breakthrough, a new model, or a new capability that seemed impossible just a year ago. Technology is improving exponentially, not linearly — and if you've been watching closely, you can feel the acceleration.

I use AI constantly in my work. I rely on it for research, drafting, summarizing, coding, and even brainstorming. But that level of reliance comes with a responsibility: knowing where the cracks are, and recognizing when AI quietly injects errors, distortions, or oversimplifications into our workflows.

In my recent presentation, "AI Slop Armageddon," I broke down five subtle ways AI quality can slip — and how to spot (and stop) them before they contaminate real work. Below is the full talk.`,
  },
}

export default function BlogPost() {
  const params = useParams()
  const slug = params?.slug as string
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const post = blogPosts[slug]

  if (!post) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-storm-light via-white to-storm-light">
        <Navbar forceScrolled />
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-storm-primary hover:text-storm-secondary">
            Back to Blog
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  // Handle special content for SWPPP mapping prototype
  const isMappingPost = slug === 'swppp-mapping-prototype'

  return (
    <main className="min-h-screen bg-gradient-to-br from-storm-light via-white to-storm-light">
      <Navbar forceScrolled />
      
      <article className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              href="/blog"
              className="inline-flex items-center text-storm-primary hover:text-storm-secondary transition-colors font-semibold group"
            >
              <svg
                className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="text-sm text-gray-500 mb-4">{post.date}</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-gradient">{post.title}</span>
            </h1>
          </motion.header>

          {/* Featured Video or First Image */}
          {post.videoUrl ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <div
                onClick={() => setIsVideoModalOpen(true)}
                className="relative aspect-video bg-gradient-to-br from-storm-primary to-storm-secondary rounded-2xl overflow-hidden shadow-2xl cursor-pointer group hover:scale-[1.02] transition-transform"
              >
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
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 transition-colors"
                      >
                        <svg
                          className="w-12 h-12 text-white ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </motion.div>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full text-white text-sm font-semibold inline-block">
                        Click to watch featured video
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 transition-colors"
                      >
                        <svg
                          className="w-12 h-12 text-white ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </motion.div>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full text-white text-sm font-semibold inline-block">
                        Click to watch featured video
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ) : post.images && post.images.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={isMappingPost ? post.images[0] : post.images[0]}
                  alt="SWPPP Mapping Prototype"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                  priority
                  unoptimized
                />
              </div>
            </motion.div>
          ) : null}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-lg max-w-none"
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
              {isMappingPost ? (
                <MappingPostContent images={post.images || []} />
              ) : (
                typeof post.content === 'string' && (
                  <>
                    {post.content.split('\n\n').filter(p => p.trim()).map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-gray-700 leading-relaxed mb-6 text-lg"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </>
                )
              )}

              {/* Author Profile */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src="/1743179351400.jpeg"
                      alt="Andrew Teravskis"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-lg">
                      Andrew Teravskis
                    </div>
                    <div className="text-gray-600 text-sm">
                      Founder and CEO, Storm
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Video Modal */}
          {post.videoUrl && (
            <VideoModal
              isOpen={isVideoModalOpen}
              onClose={() => setIsVideoModalOpen(false)}
              videoUrl={post.videoUrl}
            />
          )}
        </div>
      </article>

      <Footer />
    </main>
  )
}

