'use client'

import Hero from '@/components/Hero'
import Features from '@/components/Features'
import ExamplePDF from '@/components/ExamplePDF'
import HowItWorks from '@/components/HowItWorks'
import Testimonials from '@/components/Testimonials'
import Pricing from '@/components/Pricing'
import Team from '@/components/Team'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
// import SaleBanner from '@/components/SaleBanner'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      {/* <SaleBanner /> */}
      <Hero />
      <ExamplePDF />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <Team />
      <CTA />
      <Footer />
    </main>
  )
}


