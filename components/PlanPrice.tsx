'use client'

import { BLACK_FRIDAY_CODE, formatHalfPrice } from '@/lib/black-friday-sale'

type PlanPriceProps = {
  price: string
  cadence: string
  showSale: boolean
  size?: 'md' | 'lg'
}

export default function PlanPrice({ price, cadence, showSale, size = 'lg' }: PlanPriceProps) {
  const amountClass = size === 'lg' ? 'text-4xl' : 'text-3xl'
  const compareClass = size === 'lg' ? 'text-2xl' : 'text-xl'
  const salePrice = showSale ? formatHalfPrice(price) : price

  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        {showSale && (
          <span className={`${compareClass} font-semibold text-gray-400 line-through`}>
            <span className="sr-only">Regular price </span>
            {price}
          </span>
        )}
        <span className={`${amountClass} font-bold text-gray-900`}>
          {showSale && <span className="sr-only">Sale price </span>}
          {salePrice}
        </span>
        <span className="text-gray-500">{cadence}</span>
      </div>
      {showSale && (
        <p className="mt-1 text-sm font-semibold text-amber-700">Use code {BLACK_FRIDAY_CODE}</p>
      )}
    </div>
  )
}
