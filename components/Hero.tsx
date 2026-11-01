'use client'

import { motion } from 'framer-motion'
import AssemblingSWPPP from './AssemblingSWPPP'
import { useEffect, useState, useRef } from 'react'
import VideoModal from './VideoModal'
import { openGetStartedModal } from './pricing-plans'

const userTypes = ['Civil Engineers', 'Stormwater Consultants', 'Contractors', 'Developers', 'Landowners']

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const isInitialMount = useRef(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const currentText = userTypes[currentIndex]
    let timeout: NodeJS.Timeout

    // Check if we've transitioned to a new text (mismatch)
    const textMatches = displayedText.length === 0 || currentText.startsWith(displayedText)

    // Small delay before starting to type the first text on initial mount only
    // For transitions, we handle them in the mismatch check above
    if (displayedText.length === 0 && currentIndex === 0 && !isDeleting) {
      timeout = setTimeout(() => {
        setDisplayedText(currentText.slice(0, 1))
        isInitialMount.current = false
      }, isInitialMount.current ? 500 : 0)
    } else if (!isDeleting && !textMatches && displayedText.length > 0) {
      // We've transitioned to a new text, start typing immediately
      timeout = setTimeout(() => {
        setDisplayedText(currentText.slice(0, 1))
      }, 0)
    } else if (!isDeleting && displayedText.length < currentText.length && textMatches) {
      // Typing forward
      timeout = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length + 1))
      }, 100)
    } else if (!isDeleting && displayedText.length === currentText.length) {
      // Finished typing, wait then start deleting
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, 2000)
    } else if (isDeleting && displayedText.length > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length - 1))
      }, 50)
    } else if (isDeleting && displayedText.length === 0) {
      // Finished deleting, move to next
      const nextIndex = (currentIndex + 1) % userTypes.length
      const nextText = userTypes[nextIndex]
      setIsDeleting(false)
      setCurrentIndex(nextIndex)
      // Start typing the first character immediately
      timeout = setTimeout(() => {
        setDisplayedText(nextText.slice(0, 1))
      }, 0)
    }

    return () => clearTimeout(timeout)
  }, [mounted, displayedText, currentIndex, isDeleting])

  if (!mounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-storm-dark to-slate-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-storm-dark via-slate-900 to-storm-primary/30 opacity-95" />
        <div className="absolute -top-24 -right-16 w-[28rem] h-[28rem] bg-storm-secondary/25 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -left-16 w-[28rem] h-[28rem] bg-storm-primary/30 blur-3xl rounded-full" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-block px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-6">
                <span className="text-white font-semibold">
                  For {displayedText}
                  <span className="typewriter-cursor ml-1">|</span>
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
              Create and Manage Construction SWPPPs Faster and Smarter.
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto lg:mx-0">
                Streamline your entire Storm Water Pollution Prevention Plan workflow with the most advanced suite of tools in the industry.
                Write SWPPPs, create CAD-level maps, and perform inspections faster and more accurately than ever before.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  type="button"
                  onClick={openGetStartedModal}
                  className="px-8 py-4 bg-gradient-storm text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-shadow text-center"
                >
                  Get Started
                </button>
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
            <AssemblingSWPPP />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-storm-dark to-slate-900 text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-storm-dark via-slate-900 to-storm-primary/30 opacity-95" />
      <div className="absolute -top-24 -right-16 w-[28rem] h-[28rem] bg-storm-secondary/25 blur-3xl rounded-full" />
      <div className="absolute -bottom-24 -left-16 w-[28rem] h-[28rem] bg-storm-primary/30 blur-3xl rounded-full" />

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
              className="inline-block px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-6"
            >
              <span className="text-white font-semibold">
                For {displayedText}
                <span className="typewriter-cursor ml-1">|</span>
              </span>
            </motion.div>

            <motion.h1
              initial={mounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white"
            >
              Create and Manage Construction SWPPPs Faster and Smarter.
            </motion.h1>

            <motion.p
              initial={mounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/80 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
               Streamline your entire Storm Water Pollution Prevention Plan workflow with the most advanced suite of tools in the industry.
               Write SWPPPs, create CAD-level maps, and perform inspections faster and more accurately than ever before.
            </motion.p>

            <motion.div
              initial={mounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                type="button"
                onClick={openGetStartedModal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-storm text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-shadow text-center"
              >
                Get Started
              </motion.button>
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

          <AssemblingSWPPP />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

