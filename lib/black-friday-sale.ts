/** 11:59:59pm Pacific on November 30, 2026. */
export const BLACK_FRIDAY_SALE_ENDS_AT = new Date('2026-11-30T23:59:59-08:00')

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
