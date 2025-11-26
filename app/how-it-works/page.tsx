'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HowItWorksRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/')
    // Small delay to ensure page loads before scrolling
    setTimeout(() => {
      const element = document.getElementById('how-it-works')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }, [router])

  return null
}

