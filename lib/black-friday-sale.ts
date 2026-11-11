'use client'

import { useEffect, useState } from 'react'

/** 11:59:59pm Pacific on November 30, 2026. */
export const BLACK_FRIDAY_SALE_ENDS_AT = new Date('2026-11-30T23:59:59-08:00')

export const BLACK_FRIDAY_CODE = 'BLACKFRIDAY'

export const SELECT_ANNUAL_EVENT = 'storm-select-annual'

export type SaleTimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function isBlackFridaySaleActive(now = Date.now()) {
  return now <= BLACK_FRIDAY_SALE_ENDS_AT.getTime()
}

export function getBlackFridayTimeLeft(now = Date.now()): SaleTimeLeft {
  const difference = Math.max(0, BLACK_FRIDAY_SALE_ENDS_AT.getTime() - now)

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
  }
}

export function openAnnualPricing() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(SELECT_ANNUAL_EVENT))
  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
}

export function formatHalfPrice(price: string) {
  const amount = Number(price.replace(/[^0-9.]/g, ''))
  if (!Number.isFinite(amount)) return price
  const sale = amount / 2
  const formatted = Number.isInteger(sale) ? String(sale) : sale.toFixed(2)
  return `$${formatted}`
}

export function useBlackFridaySale() {
  const [saleActive, setSaleActive] = useState(() => isBlackFridaySaleActive())
  const [timeLeft, setTimeLeft] = useState<SaleTimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
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

  return { saleActive, timeLeft, clockReady }
}
