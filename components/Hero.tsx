'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import VideoModal from './VideoModal'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-storm-light via-white to-storm-light">
        <div className="absolute inset-0 z-0">
          <Image
            src="/iStock-1339450550.jpg"
            alt="Storm water management"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-storm-light/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-block px-4 py-2 bg-storm-primary/10 rounded-full mb-6">
                <span className="text-storm-primary font-semibold">Professional SWPPP Writing</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Write Construction SWPPPs
                <span className="block text-gradient">Faster & Smarter</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                Streamline your Storm Water Pollution Prevention Plan with the only app designed specifically for SWPPP writing.
                Save time, money, and reduce errors with Storm.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a 
                  href="https://app.getstorm.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-gradient-storm text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-shadow text-center"
                >
                  Start Free Trial
                </a>
                <button 
                  onClick={() => setIsVideoModalOpen(true)}
                  className="px-8 py-4 bg-white text-storm-primary rounded-full font-semibold text-lg border-2 border-storm-primary hover:bg-storm-light transition-colors"
                >
                  Watch Demo
                </button>
              </div>
            </div>
            <VideoModal
              isOpen={isVideoModalOpen}
              onClose={() => setIsVideoModalOpen(false)}
              videoUrl="https://player.vimeo.com/video/1139431440?h=5aba4e318d"
            />
            <div className="relative">
              <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/iStock-1339450550.jpg"
                  alt="Storm app interface"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-storm-dark/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-storm-light via-white to-storm-light">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/iStock-1339450550.jpg"
          alt="Storm water management"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-storm-light/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={mounted ? { opacity: 0, x: -50 } : { opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={mounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 bg-storm-primary/10 rounded-full mb-6"
            >
              <span className="text-storm-primary font-semibold">Professional SWPPP Writing</span>
            </motion.div>
            
            <motion.h1
              initial={mounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Write Construction SWPPPs
              <span className="block text-gradient">Faster & Smarter</span>
            </motion.h1>
            
            <motion.p
              initial={mounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Streamline your Storm Water Pollution Prevention Plan with the only app designed specifically for SWPPP writing.
              Save time, money, and reduce errors with Storm.
            </motion.p>
            
            <motion.div
              initial={mounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="https://app.getstorm.io"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-storm text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-shadow text-center"
              >
                Get Started
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsVideoModalOpen(true)}
                className="px-8 py-4 bg-white text-storm-primary rounded-full font-semibold text-lg border-2 border-storm-primary hover:bg-storm-light transition-colors"
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={mounted ? { opacity: 0, x: 50 } : { opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/iStock-1339450550.jpg"
                alt="Storm app interface"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-storm-dark/50 to-transparent" />
            </div>
            
            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-semibold text-gray-700">No AI Assistance</span>
              </div>
              <p className="text-gray-600 text-sm">Storm relies on your knowledge, not AI.</p>
            </motion.div>
            
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -top-6 -right-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs"
            >
              <div className="text-3xl font-bold text-storm-primary mb-1">2 hours</div>
              <p className="text-gray-600 text-sm">Average time to complete a SWPPP in Storm</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl="https://player.vimeo.com/video/1139431440?h=5aba4e318d"
      />
    </section>
  )
}

