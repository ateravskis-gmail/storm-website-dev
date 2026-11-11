'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BillingCycle,
  GET_STARTED_EVENT,
  pricingPlans,
  startCheckoutSession,
} from './pricing-plans'
import PlanPrice from './PlanPrice'
import { useBlackFridaySale } from '@/lib/black-friday-sale'

export default function GetStartedPlansModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')
  const [submittingPlan, setSubmittingPlan] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { saleActive } = useBlackFridaySale()
  const plans = pricingPlans[billingCycle]
  const isSubmitting = Boolean(submittingPlan)
  const showAnnualSale = saleActive && billingCycle === 'annual'

  useEffect(() => {
    const handleOpen = () => {
      setBillingCycle('monthly')
      setSubmittingPlan(null)
      setErrorMessage(null)
      setIsOpen(true)
    }
    window.addEventListener(GET_STARTED_EVENT, handleOpen)
    return () => window.removeEventListener(GET_STARTED_EVENT, handleOpen)
  }, [])

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

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen && !isSubmitting) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, isSubmitting])

  const handleClose = () => {
    if (isSubmitting) return
    setIsOpen(false)
  }

  const handleContinue = async (planName: string) => {
    if (isSubmitting) return
    setSubmittingPlan(planName)
    setErrorMessage(null)
    try {
      await startCheckoutSession(planName, billingCycle)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to start checkout. Please try again.')
      setSubmittingPlan(null)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', damping: 24, stiffness: 280 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <div
              className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={handleClose}
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

              <div className="text-center mb-8 pr-8">
                <p className="text-sm uppercase tracking-[0.25em] text-gray-500">Get started</p>
                <h3 className="mt-2 text-3xl font-semibold text-gray-900">Choose your plan</h3>
                <p className="mt-2 text-gray-500">
                  Continue to Stripe Checkout to enter your email and payment details.
                </p>
              </div>

              <div className="flex justify-center mb-8">
                <div className="inline-flex bg-gray-50 p-1 rounded-full border border-gray-100">
                  {(['monthly', 'annual'] as BillingCycle[]).map((cycle) => {
                    const isActive = billingCycle === cycle
                    return (
                      <button
                        key={cycle}
                        type="button"
                        onClick={() => setBillingCycle(cycle)}
                        disabled={isSubmitting}
                        className={`relative px-6 py-2 text-sm font-semibold rounded-full transition-all disabled:opacity-60 ${
                          isActive ? 'text-white' : 'text-gray-500'
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="get-started-toggle-pill"
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-storm-primary to-storm-secondary"
                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10 capitalize">
                          {cycle === 'monthly' ? 'Monthly' : 'Annual'}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {plans.map((plan) => (
                  <div
                    key={`${plan.name}-${billingCycle}`}
                    className={`flex flex-col rounded-3xl border bg-white p-6 shadow-lg ${
                      plan.name === 'Pro'
                        ? 'border-storm-primary/40 shadow-storm-primary/10'
                        : 'border-gray-100'
                    }`}
                  >
                    <h4 className="text-xl font-semibold text-gray-900">{plan.name}</h4>
                    <p className="text-sm text-gray-500">{plan.description}</p>
                    <div className="mt-4">
                      <PlanPrice
                        price={plan.price}
                        cadence={plan.cadence}
                        showSale={showAnnualSale}
                        size="md"
                      />
                    </div>
                    {plan.billingNote && (
                      <p className="mt-1 text-sm text-gray-500">{plan.billingNote}</p>
                    )}
                    <ul className="mt-5 mb-6 space-y-2 flex-1">
                      {plan.features.map((feature) => (
                        <li key={feature.key} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
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
                    <button
                      type="button"
                      onClick={() => handleContinue(plan.name)}
                      disabled={isSubmitting}
                      className={`w-full rounded-full px-6 py-3 font-semibold text-white disabled:cursor-wait disabled:opacity-70 ${
                        plan.name === 'Pro'
                          ? 'bg-gradient-to-r from-storm-primary to-storm-secondary shadow-lg shadow-storm-primary/30'
                          : 'bg-storm-dark hover:bg-storm-primary'
                      }`}
                    >
                      {submittingPlan === plan.name ? 'Redirecting…' : 'Continue'}
                    </button>
                  </div>
                ))}
              </div>

              {errorMessage && (
                <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-center text-sm text-red-700">
                  {errorMessage}
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
