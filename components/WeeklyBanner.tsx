'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const highlights = [
  { label: 'QPE & rain alerts', detail: 'NOAA forecasts and station alerts' },
  { label: 'Sampling equipment', detail: 'QR-linked calibration on reports' },
  { label: 'Synced to Storm', detail: 'Projects carry over automatically' },
]

const HIGHLIGHT_INTERVAL_MS = 3200

export default function WeeklyBanner() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % highlights.length)
    }, HIGHLIGHT_INTERVAL_MS)

    return () => clearInterval(timer)
  }, [])

  const activeHighlight = highlights[activeIndex]

  return (
    <section
      id="weekly-banner"
      className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-storm-dark to-slate-900 text-white pt-32 pb-10"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-storm-dark via-slate-900 to-storm-primary/30 opacity-95" />
      <div className="absolute -top-16 -right-12 w-72 h-72 bg-storm-secondary/25 blur-3xl rounded-full" />
      <div className="absolute -bottom-16 -left-12 w-72 h-72 bg-storm-primary/25 blur-3xl rounded-full" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:justify-between lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex-1 min-w-0 flex flex-col"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-storm-secondary/90 mb-2">
              Storm + Weekly
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              Storm is now integrated with Weekly, a game-changing stormwater inspection app.
            </h2>
            <p className="mt-3 text-white/80 text-lg max-w-2xl">
              Every Storm account now includes full access to{' '}
              <span className="font-semibold text-white">Weekly</span> — the
              stormwater inspection app with patent-pending photo-first flow,
              NOAA weather reports &amp; QPE alerts, sampling equipment tracking, inspection log exports, and much more.
              Use your Storm login to access Weekly.
            </p>

            <div className="mt-6 flex flex-col items-start gap-2">
              <Link
                href="https://getweekly.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-2.5 rounded-full font-semibold text-base text-white/90 border border-storm-secondary/40 bg-storm-primary/30 backdrop-blur-md shadow-lg shadow-storm-primary/30 transition-all duration-300 hover:bg-gradient-to-r hover:from-storm-primary hover:to-storm-secondary hover:text-white hover:border-transparent hover:shadow-storm-secondary/50"
              >
                Open Weekly
              </Link>
              <p className="text-xs text-white/50">
                Sign in with your existing Storm credentials
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-xl mx-auto lg:mx-0 lg:w-[44%] lg:min-w-[20rem] lg:max-w-[34rem] shrink-0 flex"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden shadow-2xl shadow-storm-primary/20 flex flex-col w-full h-full min-h-[280px]">
              <div className="relative flex-1 min-h-[160px]">
                <Image
                  src="https://getweekly.io/images/product-photo.webp"
                  alt="Weekly stormwater inspection app on a phone in the field"
                  fill
                  sizes="(max-width: 1024px) 100vw, 544px"
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
              </div>

              <div className="px-4 py-4 bg-slate-900/50 shrink-0">
                <div className="relative h-[4.5rem] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeHighlight.label}
                      initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                      className="absolute inset-0 flex flex-col justify-center rounded-xl bg-gradient-to-r from-storm-primary/20 via-white/5 to-storm-secondary/10 px-4 py-3 border border-storm-secondary/25"
                    >
                      <p className="text-sm font-bold text-storm-secondary uppercase tracking-wide">
                        {activeHighlight.label}
                      </p>
                      <p className="text-sm text-white/75 mt-0.5">{activeHighlight.detail}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex justify-center gap-1.5 mt-3">
                  {highlights.map((item, index) => (
                    <button
                      key={item.label}
                      type="button"
                      aria-label={`Show ${item.label}`}
                      onClick={() => setActiveIndex(index)}
                      className="relative h-1.5 rounded-full overflow-hidden bg-white/15 transition-all duration-300"
                      style={{ width: index === activeIndex ? '1.75rem' : '0.375rem' }}
                    >
                      {index === activeIndex && (
                        <motion.span
                          key={activeIndex}
                          className="absolute inset-0 rounded-full bg-storm-secondary"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: HIGHLIGHT_INTERVAL_MS / 1000, ease: 'linear' }}
                          style={{ transformOrigin: 'left' }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
