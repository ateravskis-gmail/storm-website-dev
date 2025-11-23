'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import ExamplePDF from '@/components/ExamplePDF'
import HowItWorks from '@/components/HowItWorks'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ExamplePDF />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}


