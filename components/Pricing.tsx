'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import PlanCheckoutModal from './PlanCheckoutModal'
import PlanPrice from './PlanPrice'
import { BillingCycle, PlanCheckoutDetails, pricingPlans } from './pricing-plans'
import { SELECT_ANNUAL_EVENT, useBlackFridaySale } from '@/lib/black-friday-sale'

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')
  const [selectedPlan, setSelectedPlan] = useState<PlanCheckoutDetails | null>(null)
  const { saleActive } = useBlackFridaySale()
  const plans = pricingPlans[billingCycle]
  const showAnnualSale = saleActive && billingCycle === 'annual'

  useEffect(() => {
    const selectAnnual = () => setBillingCycle('annual')
    window.addEventListener(SELECT_ANNUAL_EVENT, selectAnnual)
    return () => window.removeEventListener(SELECT_ANNUAL_EVENT, selectAnnual)
  }, [])

  return (
    <section id="pricing" className="py-32 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-3">
            Flexible Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get Started for $19
          </h2>
          <p className="text-lg text-gray-600">
            Even less with annual plans.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white p-1 rounded-full shadow-lg shadow-black/5 border border-gray-100">
            {(['monthly', 'annual'] as BillingCycle[]).map((cycle) => {
              const isActive = billingCycle === cycle
              return (
                <button
                  key={cycle}
                  onClick={() => setBillingCycle(cycle)}
                  className={`relative px-6 py-2 text-sm font-semibold rounded-full transition-all ${
                    isActive ? 'text-white' : 'text-gray-500'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="toggle-pill"
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

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={`${plan.name}-${billingCycle}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-3xl bg-white p-8 shadow-xl border ${
                plan.name === 'Pro' ? 'border-storm-primary/40 shadow-storm-primary/20' : 'border-gray-100'
              }`}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
                <p className="text-gray-500">{plan.description}</p>
              </div>

              <div className="mb-6">
                <PlanPrice
                  price={plan.price}
                  cadence={plan.cadence}
                  showSale={showAnnualSale}
                />
                {plan.billingNote && (
                  <p className="text-sm text-gray-500 mt-1">{plan.billingNote}</p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={feature.key} className="flex items-center gap-3 text-gray-700">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span>
                      {feature.content}
                      {featureIndex === 0 && <sup className="text-storm-primary ml-1">*</sup>}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => setSelectedPlan(plan)}
                className={`w-full inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold transition-all ${
                  plan.name === 'Pro'
                    ? 'bg-gradient-to-r from-storm-primary to-storm-secondary text-white shadow-lg shadow-storm-primary/40'
                    : 'bg-storm-dark text-white hover:bg-storm-primary'
                }`}
              >
                Choose Plan
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-600">
            <sup className="text-storm-primary mr-1">*</sup>
            Currently supporting California CGP (traditional and LUP) projects. More permits and other States coming soon.
          </p>
        </motion.div>

        <div className="mt-12 max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-white p-8 shadow-xl border border-gray-100 text-center"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-3">Need something special?</p>
            <h3 className="text-3xl font-semibold text-gray-900 mb-2">Custom Template Creation</h3>
            <p className="text-gray-600 mb-6">
              Work directly with our team to build a bespoke SWPPP template tailored to your organization.
            </p>
            <a
              href="mailto:andrew@getstorm.io?subject=Custom%20Template%20Request"
              className="inline-flex items-center justify-center rounded-full px-10 py-3 font-semibold border border-storm-primary text-storm-primary hover:bg-storm-primary hover:text-white transition-colors"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </div>

      <PlanCheckoutModal
        isOpen={Boolean(selectedPlan)}
        plan={selectedPlan}
        billingCycle={billingCycle}
        onClose={() => setSelectedPlan(null)}
      />
    </section>
  )
}
