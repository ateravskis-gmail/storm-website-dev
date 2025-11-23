'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const testimonials = [
  {
    name: 'John Teravskis, QSD, CPESC',
    role: 'Environmental Consultant',
    company: 'WGR Southwest, Inc.',
    content: (
      <>&apos;As the creator of the Connections Course and the Chief Compliance Officer of Storm, 
      I&apos;m so excited to help bring Storm to life. We&apos;re now using it in house at WGR Southwest, 
      and it is greatly reducing the average time our staff spends writing SWPPPs.
      </>
    ),
    image: '/IMG_2987.jpeg',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Project Manager',
    company: 'BuildRight Construction',
    content: 'The compliance checking feature alone is worth the price. We\'ve never had a plan rejected since switching to Storm.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Environmental Engineer',
    company: 'GreenTech Engineering',
    content: 'The templates are comprehensive and the AI suggestions are incredibly helpful. This is the future of SWPPP writing.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    rating: 5,
  },
]

export default function Testimonials() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={mounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by Industry Professionals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what environmental consultants, engineers, and project managers are saying about Storm.
          </p>
        </motion.div>

        <div className="flex justify-center">
          {testimonials.slice(0, 1).map((testimonial, index) => (
            <motion.div
              key={index}
              initial={mounted ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-storm-light to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow max-w-3xl w-full"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                {typeof testimonial.content === 'string' ? `"${testimonial.content}"` : testimonial.content}
              </p>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-storm-primary">{testimonial.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

