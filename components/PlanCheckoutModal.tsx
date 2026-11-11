'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BillingCycle, PlanCheckoutDetails, startCheckoutSession } from './pricing-plans'
import PlanPrice from './PlanPrice'
import { useBlackFridaySale } from '@/lib/black-friday-sale'

export type { PlanCheckoutDetails }

type PlanCheckoutModalProps = {
  isOpen: boolean
  plan: PlanCheckoutDetails | null
  billingCycle: BillingCycle
  onClose: () => void
}

export default function PlanCheckoutModal({
  isOpen,
  plan,
  billingCycle,
  onClose,
}: PlanCheckoutModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { saleActive } = useBlackFridaySale()
  const showAnnualSale = saleActive && billingCycle === 'annual'

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setErrorMessage(null)
      setIsSubmitting(false)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen && !isSubmitting) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, isSubmitting, onClose])

  const handleContinue = async () => {
    if (!plan || isSubmitting) return

    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      await startCheckoutSession(plan.name, billingCycle)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to start checkout. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && plan && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              if (!isSubmitting) onClose()
            }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', damping: 24, stiffness: 280 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                aria-label="Close"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <p className="text-sm uppercase tracking-[0.25em] text-gray-500">Subscription</p>
              <h3 className="mt-2 text-3xl font-semibold text-gray-900">{plan.name}</h3>
              <p className="mt-1 text-gray-500">{plan.description}</p>

              <div className="mt-6">
                <PlanPrice price={plan.price} cadence={plan.cadence} showSale={showAnnualSale} />
              </div>
              {plan.billingNote && (
                <p className="mt-1 text-sm text-gray-500">{plan.billingNote}</p>
              )}

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature.key} className="flex items-start gap-3 text-gray-700">
                    <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span>{feature.content}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm leading-6 text-gray-500">
                Continue to Stripe Checkout to enter your email and payment details. Your
                subscription renews {billingCycle === 'annual' ? 'annually' : 'monthly'} until
                you cancel.
              </p>

              {errorMessage && (
                <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMessage}
                </p>
              )}

              <button
                type="button"
                onClick={handleContinue}
                disabled={isSubmitting}
                className="mt-6 w-full rounded-full bg-gradient-to-r from-storm-primary to-storm-secondary px-6 py-3 font-semibold text-white shadow-lg shadow-storm-primary/30 disabled:cursor-wait disabled:opacity-70"
              >
                {isSubmitting ? 'Redirecting…' : 'Continue'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
