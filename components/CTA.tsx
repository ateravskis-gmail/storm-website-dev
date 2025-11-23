'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function CTA() {
  const [mounted, setMounted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isModalOpen])

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Storm water"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-storm-dark/90 to-storm-primary/90" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={mounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your SWPPP Writing?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join the list of professionals who are already saving time and ensuring compliance with Storm.
            Signup today to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="https://app.getstorm.io"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-storm-primary rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-shadow text-center"
            >
              Get Started
            </motion.a>
            <motion.button
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent text-white rounded-full font-semibold text-lg border-2 border-white hover:bg-white/10 transition-colors"
            >
              Schedule Demo
            </motion.button>
          </div>
          <p className="text-white/70 mt-6 text-sm">
            ✓ 14-day money back guarantee     ✓ Cancel anytime
          </p>
        </motion.div>
      </div>

      {/* Calendly Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ 
                type: "spring",
                damping: 25,
                stiffness: 300
              }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full max-w-4xl h-[90vh] max-h-[800px]">
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsModalOpen(false)}
                  className="absolute -top-12 right-0 md:-top-14 md:-right-4 z-10 p-3 md:p-4 text-white hover:text-storm-secondary transition-colors rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 shadow-lg"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-6 h-6 md:w-7 md:h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>

                {/* Calendly Container */}
                <div className="relative w-full h-full rounded-xl md:rounded-2xl overflow-hidden shadow-2xl bg-white border border-white/10">
                  <iframe
                    src="https://calendly.com/andrew-getstorm"
                    className="w-full h-full"
                    frameBorder="0"
                    title="Schedule a Demo"
                  />
                </div>

                {/* Decorative gradient overlay */}
                <div className="absolute -inset-1 bg-gradient-to-r from-storm-primary via-storm-secondary to-storm-primary rounded-2xl opacity-20 blur-xl -z-10" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}

