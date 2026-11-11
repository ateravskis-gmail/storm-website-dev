'use client'

import { useEffect, useState } from 'react'
import {
  getBlackFridayTimeLeft,
  isBlackFridaySaleActive,
  openAnnualPricing,
  type SaleTimeLeft,
} from '@/lib/black-friday-sale'

const countdownUnits: Array<{ key: keyof SaleTimeLeft; label: string }> = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hrs' },
  { key: 'minutes', label: 'Min' },
  { key: 'seconds', label: 'Sec' },
]

export default function SaleBanner() {
  const [timeLeft, setTimeLeft] = useState<SaleTimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [saleActive, setSaleActive] = useState(() => isBlackFridaySaleActive())
  const [clockReady, setClockReady] = useState(false)

  useEffect(() => {
    const tick = () => {
      setSaleActive(isBlackFridaySaleActive())
      setTimeLeft(getBlackFridayTimeLeft())
      setClockReady(true)
    }

    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [])

  if (!saleActive) return null

  return (
    <>
      <div className="h-20" aria-hidden="true" />
      <section
        aria-label="Black Friday sale"
        className="relative bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 text-storm-dark"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex flex-col items-center gap-2.5 lg:flex-row lg:justify-between">
            <p className="text-center text-sm sm:text-base font-semibold leading-snug lg:text-left">
              <span className="font-bold uppercase tracking-[0.16em]">Black Friday</span>
              <span className="mx-2 text-storm-dark/40">·</span>
              50% off annual plans through November 30
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <div className="flex items-center gap-1" aria-hidden="true">
                {countdownUnits.map((item) => (
                  <div
                    key={item.label}
                    className="min-w-[2.6rem] rounded-md bg-storm-dark/10 px-1.5 py-1 text-center"
                  >
                    <span className="block text-sm font-bold tabular-nums leading-none">
                      {clockReady ? String(timeLeft[item.key]).padStart(2, '0') : '--'}
                    </span>
                    <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-wide text-storm-dark/70">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={openAnnualPricing}
                className="inline-flex items-center justify-center rounded-full bg-storm-dark px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-black whitespace-nowrap"
              >
                View annual plans
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
