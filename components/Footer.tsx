'use client'

import { type MouseEvent, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import TermsOfServiceModal from './TermsOfServiceModal'
import PrivacyPolicyModal from './PrivacyPolicyModal'

export default function Footer() {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)

  const handleContactClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    window.dispatchEvent(new Event('open-calendly-modal'))
  }

  return (
    <footer className="bg-storm-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/storm-logo-white.png"
                alt="Storm Logo"
                width={150}
                height={50}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm">
              Professional SWPPP writing made simple. Write faster, ensure compliance, and save time.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#team" className="hover:text-white transition-colors">About</a></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li>
                <button
                  onClick={handleContactClick}
                  className="hover:text-white transition-colors text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button 
                  onClick={() => setIsPrivacyModalOpen(true)}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsTermsModalOpen(true)}
                  className="hover:text-white transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Storm Digital. All rights reserved.
          </p>
        </div>
      </div>
      <TermsOfServiceModal 
        isOpen={isTermsModalOpen} 
        onClose={() => setIsTermsModalOpen(false)} 
      />
      <PrivacyPolicyModal 
        isOpen={isPrivacyModalOpen} 
        onClose={() => setIsPrivacyModalOpen(false)} 
      />
    </footer>
  )
}

