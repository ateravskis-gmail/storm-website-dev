'use client'

import { ReactNode, useState } from 'react'
import { motion } from 'framer-motion'

type BillingCycle = 'monthly' | 'annual'

type FeatureItem = {
  key: string
  content: ReactNode
}

const sharedBenefits: FeatureItem[] = [
  { key: 'team', content: 'Unlimited team members' },
  { key: 'revisions', content: 'Unlimited revisions and exports' },
  {
    key: 'weekly',
    content: (
      <>
        Free subscription to{' '}
        <a
          href="https://getweekly.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-storm-primary underline decoration-dashed underline-offset-4"
        >
          Weekly.io
        </a>
      </>
    ),
  },
]

const moneyBackFeature: FeatureItem = {
  key: 'guarantee',
  content: '14-day money-back guarantee',
}

const buildFeatures = (base: FeatureItem[]): FeatureItem[] => [
  ...base,
  ...sharedBenefits,
  moneyBackFeature,
]

const expressFeatures = buildFeatures([
  { key: 'express-project', content: '1 project' },
  { key: 'express-support', content: 'Limited support' },
])

const proFeatures = buildFeatures([
  { key: 'pro-projects', content: '10 projects' },
  { key: 'pro-support', content: 'Dedicated support' },
])

const businessFeatures = buildFeatures([
  { key: 'business-projects', content: 'Unlimited projects' },
  { key: 'business-support', content: 'Dedicated support' },
])

const pricingPlans: Record<
  BillingCycle,
  Array<{
    name: string
    price: string
    cadence: string
    description: string
    features: FeatureItem[]
    badge?: string
    highlight?: boolean
    billingNote?: string
    originalPrice?: string
    savingsCopy?: string
    promoPrice?: string
    promoSavings?: string
  }>
> = {
  monthly: [
    {
      name: 'Express',
      price: '$74.99',
      cadence: '/month',
      promoPrice: '$37.50',
      promoSavings: '$37.49',
      description: 'Perfect for getting started',
      features: expressFeatures,
    },
    {
      name: 'Pro',
      price: '$199.99',
      cadence: '/month',
      promoPrice: '$100.00',
      promoSavings: '$99.99',
      description: 'For professionals and small teams',
      features: proFeatures,
      highlight: true,
    },
    {
      name: 'Business',
      price: '$999',
      cadence: '/month',
      promoPrice: '$499.50',
      promoSavings: '$499.50',
      description: 'For growing businesses and teams',
      features: businessFeatures,
    },
  ],
  annual: [
    {
      name: 'Express',
      price: '$49.99',
      cadence: '/month',
      billingNote: 'billed annually',
      originalPrice: '$599.88',
      savingsCopy: 'Save $149.88',
      promoPrice: '$24.99',
      promoSavings: '$24.99',
      description: 'Perfect for getting started',
      features: expressFeatures,
      badge: '25% OFF',
    },
    {
      name: 'Pro',
      price: '$129.99',
      cadence: '/month',
      billingNote: 'billed annually',
      originalPrice: '$1,559.88',
      savingsCopy: 'Save $660',
      promoPrice: '$64.99',
      promoSavings: '$64.99',
      description: 'For professionals and small teams',
      features: proFeatures,
      badge: '42.3% OFF',
      highlight: true,
    },
    {
      name: 'Business',
      price: '$449.99',
      cadence: '/month',
      billingNote: 'billed annually',
      originalPrice: '$5,399.88',
      savingsCopy: 'Save $3,000',
      promoPrice: '$224.99',
      promoSavings: '$224.99',
      description: 'For growing businesses and teams',
      features: businessFeatures,
      badge: '55.6% OFF',
    },
  ],
}

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annual')
  const plans = pricingPlans[billingCycle]

  return (
    <section id="pricing" className="py-32 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-3">
            Flexible Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose the plan that fits your workflow
          </h2>
          <p className="text-lg text-gray-600">
            Lock in serious savings with annual plans.
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
                plan.highlight ? 'border-storm-primary/40 shadow-storm-primary/20' : 'border-gray-100'
              }`}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
                <p className="text-gray-500">{plan.description}</p>
              </div>

              <div className="mb-6">
                {plan.promoPrice ? (
                  <>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-gray-900">{plan.promoPrice}</span>
                      <span className="text-gray-500">{plan.cadence}</span>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        <span className="line-through mr-2">{plan.price}</span>
                        <span className="text-emerald-600 font-semibold">Save {plan.promoSavings}/month</span>
                      </p>
                    </div>
                    {plan.billingNote && (
                      <p className="text-sm text-gray-500 mt-1">{plan.billingNote}</p>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-500">{plan.cadence}</span>
                    </div>
                    {plan.billingNote && (
                      <p className="text-sm text-gray-500 mt-1">{plan.billingNote}</p>
                    )}
                  </>
                )}
              </div>

              {/* Promo Code Display */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6 relative"
              >
                <div className="relative rounded-2xl bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-cyan-500/10 p-4 border-2 border-dashed border-cyan-400/40">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-wider text-purple-700 mb-1 font-semibold">
                        Cyber Monday Promo
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent tracking-wider">
                          CYBER50
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.05, 1],
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="relative"
                      >
                        {/* Glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500 via-indigo-500 to-purple-600 rounded-xl blur opacity-60 animate-pulse" />
                        {/* Main badge */}
                        <div className="relative px-4 py-3 rounded-xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-purple-600 flex flex-col items-center justify-center shadow-2xl border-2 border-white/20">
                          {/* Inner shine */}
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/20 via-transparent to-transparent" />
                          <span className="text-white text-sm font-black leading-none tracking-tight relative z-10">50%</span>
                          <span className="text-white text-[10px] font-extrabold leading-none tracking-widest uppercase relative z-10 mt-0.5">OFF</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  {/* Shine effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>

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

              <a
                href="https://app.getstorm.io"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold transition-all ${
                  plan.highlight
                    ? 'bg-gradient-to-r from-storm-primary to-storm-secondary text-white shadow-lg shadow-storm-primary/40'
                    : 'bg-storm-dark text-white hover:bg-storm-primary'
                }`}
              >
                Choose Plan
              </a>
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
    </section>
  )
}


