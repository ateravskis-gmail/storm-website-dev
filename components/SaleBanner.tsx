'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function SaleBanner() {
  return (
    <section className="relative overflow-hidden bg-storm-dark text-white pt-32 pb-10">
      <div className="absolute inset-0 bg-gradient-to-r from-storm-dark via-black to-storm-primary opacity-90" />
      <div className="absolute -top-16 -right-12 w-72 h-72 bg-storm-secondary/40 blur-3xl rounded-full" />
      <div className="absolute -bottom-16 -left-12 w-72 h-72 bg-storm-primary/30 blur-3xl rounded-full" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-2">
              Black Friday • Nov. 24th - 30th Only
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              Supercharge your SWPPP workflow &amp; save 50% on any Storm plan
            </h2>
            <p className="mt-3 text-white/80 text-lg">
              Use promo code{' '}
              <span className="font-bold text-white bg-white/10 px-2 py-1 rounded-md tracking-wide">
                STORM50
              </span>{' '}
              at checkout to lock in this limited time offer.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              href="https://app.getstorm.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-12 py-3 rounded-full font-semibold text-lg text-white/90 border border-white/30 bg-white/10 backdrop-blur-md shadow-lg shadow-black/20 transition-all duration-300 hover:bg-gradient-to-r hover:from-storm-primary hover:to-storm-secondary hover:text-white hover:border-transparent hover:shadow-storm-primary/40 whitespace-nowrap"
            >
              Claim STORM50
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


