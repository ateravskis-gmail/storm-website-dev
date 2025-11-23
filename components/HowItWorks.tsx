'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const steps = [
  {
    number: '01',
    title: 'Create Your Project',
    description: 'Start by entering your project name, location, and other basic information.',
    image: '/Storm Laptop Project.jpg',
  },
  {
    number: '02',
    title: 'Fill in the Details',
    description: 'Follow our guided process to write your plan narrative, identify pollutant sources, and describe your BMP strategy.',
    image: '/iStock-1483651249.jpg',
  },
  {
    number: '03',
    title: 'Export and Review',
    description: 'Review your SWPPP for accuracy with our validation tool, and then export as a PDF to submit.',
    image: '/iStock-2219063439.jpg',
  },
  {
    number: '04',
    title: 'Keep it Current',
    description: 'Return to your SWPPP anytime to make updates, log revisions, and export new versions.',
    image: '/iStock-1778043211.jpg',
  },
]

export default function HowItWorks() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-br from-storm-light to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={mounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get from project start to completed SWPPP plan in four simple steps.
          </p>
        </motion.div>

        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={mounted ? { opacity: 0, x: index % 2 === 0 ? -50 : 50 } : { opacity: 1, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
            >
              <div className="flex-1">
                <div className="inline-block mb-4">
                  <span className="text-6xl font-bold text-storm-primary/20">{step.number}</span>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-gray-900">{step.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{step.description}</p>
              </div>
              <div className={`flex-1 relative h-80 w-full rounded-2xl overflow-hidden shadow-[0_20px_60px_-12px_rgba(0,0,0,0.25)] bg-white`}>
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  className="object-cover"
                  style={{ objectPosition: index === 0 ? 'top left' : 'center' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

