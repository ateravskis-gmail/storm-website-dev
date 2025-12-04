'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function SaleBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const endDate = new Date('2025-12-05T23:59:59')
      const now = new Date()
      const difference = endDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pt-32 pb-10">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-purple-950 to-indigo-950 opacity-95" />
      <div className="absolute -top-16 -right-12 w-72 h-72 bg-cyan-500/30 blur-3xl rounded-full" />
      <div className="absolute -bottom-16 -left-12 w-72 h-72 bg-indigo-500/30 blur-3xl rounded-full" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/90 mb-2">
              Cyber Monday • Dec. 1st - 5th Only
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              Supercharge your SWPPP workflow &amp; save 50% on any Storm plan
            </h2>
            <p className="mt-3 text-white/80 text-lg">
              Use promo code{' '}
              <span className="font-bold text-white bg-white/10 px-2 py-1 rounded-md tracking-wide">
                CYBER50
              </span>{' '}
              at checkout to lock in this limited time offer.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center lg:items-end gap-4"
          >
            {/* Countdown Timer */}
            <div className="text-center lg:text-right">
              <motion.p
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-sm uppercase tracking-wider text-red-400 mb-3 font-bold"
              >
                ⚠️ Sale Ends In
              </motion.p>
              <div className="flex gap-2 lg:gap-3">
                {[
                  { value: timeLeft.days, label: 'Days' },
                  { value: timeLeft.hours, label: 'Hours' },
                  { value: timeLeft.minutes, label: 'Minutes' },
                  { value: timeLeft.seconds, label: 'Seconds' },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    animate={{
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        '0 0 0px rgba(239, 68, 68, 0)',
                        '0 0 20px rgba(239, 68, 68, 0.6)',
                        '0 0 0px rgba(239, 68, 68, 0)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.1,
                    }}
                    className="relative flex flex-col items-center bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-md rounded-xl px-4 py-3 border-2 border-red-400/60 min-w-[70px]"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-red-500/30 to-orange-500/30 opacity-0 animate-pulse" />
                    <span className="relative text-3xl font-bold text-white tabular-nums drop-shadow-lg">
                      {String(item.value).padStart(2, '0')}
                    </span>
                    <span className="relative text-xs text-red-200 uppercase tracking-wider mt-1 font-semibold">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <Link
              href="https://app.getstorm.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-12 py-3 rounded-full font-semibold text-lg text-white/90 border border-cyan-400/40 bg-cyan-500/20 backdrop-blur-md shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-indigo-600 hover:text-white hover:border-transparent hover:shadow-cyan-500/50 whitespace-nowrap"
            >
              Claim CYBER50
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


