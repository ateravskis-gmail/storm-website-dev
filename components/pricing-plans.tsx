'use client'

import { ReactNode } from 'react'
import { siteConfig } from '@/lib/site'

export type BillingCycle = 'monthly' | 'annual'

export type PlanCheckoutDetails = {
  name: string
  price: string
  cadence: string
  description: string
  features: Array<{ key: string; content: ReactNode }>
  billingNote?: string
}

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

const buildFeatures = (base: FeatureItem[]): FeatureItem[] => [
  ...base,
  ...sharedBenefits,
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

export const pricingPlans: Record<BillingCycle, PlanCheckoutDetails[]> = {
  monthly: [
    {
      name: 'Express',
      price: '$19',
      cadence: '/month',
      description: 'Perfect for getting started',
      features: expressFeatures,
    },
    {
      name: 'Pro',
      price: '$59',
      cadence: '/month',
      description: 'For professionals and small teams',
      features: proFeatures,
    },
    {
      name: 'Business',
      price: '$199',
      cadence: '/month',
      description: 'For growing businesses and teams',
      features: businessFeatures,
    },
  ],
  annual: [
    {
      name: 'Express',
      price: '$15',
      cadence: '/month',
      billingNote: 'billed annually',
      description: 'Perfect for getting started',
      features: expressFeatures,
    },
    {
      name: 'Pro',
      price: '$49',
      cadence: '/month',
      billingNote: 'billed annually',
      description: 'For professionals and small teams',
      features: proFeatures,
    },
    {
      name: 'Business',
      price: '$149',
      cadence: '/month',
      billingNote: 'billed annually',
      description: 'For growing businesses and teams',
      features: businessFeatures,
    },
  ],
}

export const GET_STARTED_EVENT = 'open-get-started-modal'

export function openGetStartedModal() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(GET_STARTED_EVENT))
}

export function planIdFromName(name: string): 'express' | 'pro' | 'business' | null {
  const normalized = name.trim().toLowerCase()
  if (normalized === 'express') return 'express'
  if (normalized === 'pro') return 'pro'
  if (normalized === 'business') return 'business'
  return null
}

export async function startCheckoutSession(planName: string, billingCycle: BillingCycle): Promise<void> {
  const planId = planIdFromName(planName)
  if (!planId) {
    throw new Error('This plan is unavailable right now.')
  }

  const response = await fetch(`${siteConfig.stormApiUrl}/billing/checkout-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      plan: planId,
      interval: billingCycle === 'annual' ? 'year' : 'month',
    }),
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok || !data.checkoutUrl) {
    throw new Error(data.error || 'Unable to start checkout. Please try again.')
  }

  window.location.assign(data.checkoutUrl)
}
