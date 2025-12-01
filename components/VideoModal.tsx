'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
}

export default function VideoModal({ isOpen, onClose, videoUrl }: VideoModalProps) {
  // Extract video ID from Vimeo URL
  // Handles both formats: https://vimeo.com/1122303387 and https://vimeo.com/video/1122303387
  const getVideoId = (url: string) => {
    // Try /video/ format first
    let match = url.match(/\/video\/(\d+)/)
    if (match) return match[1]
    
    // Try direct vimeo.com/ID format
    match = url.match(/vimeo\.com\/(\d+)/)
    return match ? match[1] : null
  }

  const videoId = getVideoId(videoUrl)
  const embedUrl = videoId ? `https://player.vimeo.com/video/${videoId}?h=5aba4e318d&autoplay=1&title=0&byline=0&portrait=0` : ''

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
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
            <div className="relative w-full max-w-6xl">
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
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

              {/* Video Container */}
              <div className="relative w-full aspect-video rounded-xl md:rounded-2xl overflow-hidden shadow-2xl bg-black/50 backdrop-blur-xl border border-white/10 ring-4 ring-white/5">
                {embedUrl ? (
                  <iframe
                    src={embedUrl}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title="Storm Demo Video"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-white">
                    <p>Video not available</p>
                  </div>
                )}
              </div>

              {/* Decorative gradient overlay */}
              <div className="absolute -inset-1 bg-gradient-to-r from-storm-primary via-storm-secondary to-storm-primary rounded-2xl opacity-20 blur-xl -z-10" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

