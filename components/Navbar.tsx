'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) {
    return (
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/storm-logo.png"
                  alt="Storm Logo"
                  width={150}
                  height={50}
                  className="h-8 md:h-10 w-auto"
                  priority
                />
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-storm-primary transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-storm-primary transition-colors">How It Works</a>
              <a href="#testimonials" className="text-gray-700 hover:text-storm-primary transition-colors">Testimonials</a>
              <a 
                href="https://app.getstorm.io"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-gradient-storm text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
              >
                Get Started
              </a>
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center"
              >
                <Image
                  src="/storm-logo.png"
                  alt="Storm Logo"
                  width={150}
                  height={50}
                  className="h-8 md:h-10 w-auto"
                  priority
                />
              </motion.div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-storm-primary transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-storm-primary transition-colors">
              How It Works
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-storm-primary transition-colors">
              Testimonials
            </a>
            <motion.a
              href="https://app.getstorm.io"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-storm text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Get Started
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-gray-700 hover:text-storm-primary">Features</a>
              <a href="#how-it-works" className="block text-gray-700 hover:text-storm-primary">How It Works</a>
              <a href="#testimonials" className="block text-gray-700 hover:text-storm-primary">Testimonials</a>
              <a 
                href="https://app.getstorm.io"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-6 py-2 bg-gradient-storm text-white rounded-full font-semibold text-center block"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

