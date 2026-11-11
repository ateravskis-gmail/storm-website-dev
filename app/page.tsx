'use client'

import Hero from '@/components/Hero'
// Temporarily hidden: the Everything You Need section.
// import Features from '@/components/Features'
import ExamplePDF from '@/components/ExamplePDF'
// import HowItWorks from '@/components/HowItWorks'
import Testimonials from '@/components/Testimonials'
import Pricing from '@/components/Pricing'
import Team from '@/components/Team'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import FeatureTabs from '@/components/FeatureTabs'
import SaleBanner from '@/components/SaleBanner'
import { isBlackFridaySaleActive } from '@/lib/black-friday-sale'
// import WeeklyBanner from '@/components/WeeklyBanner'

export default function Home() {
  const saleActive = isBlackFridaySaleActive()

  return (
    <main className="min-h-screen">
      <Navbar forceScrolled={saleActive} />
      <SaleBanner />
      {/* <WeeklyBanner /> */}
      <Hero />
      <FeatureTabs />
      <ExamplePDF />
      <Testimonials />
      {/* <Features /> */}
      {/* Temporarily hidden: <HowItWorks /> */}
      <Pricing />
      <Team />
      <Footer />
    </main>
  )
}


