'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

interface TermsOfServiceModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TermsOfServiceModal({ isOpen, onClose }: TermsOfServiceModalProps) {
  // Prevent body scroll when modal is open
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

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ 
              type: "spring",
              damping: 25,
              stiffness: 300
            }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>

              {/* Header */}
              <div className="px-6 md:px-8 pt-6 md:pt-8 pb-4 border-b border-gray-200">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Terms of Service — Storm
                </h2>
                <p className="text-sm text-gray-500">Last Updated: December 11, 2025</p>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 md:py-8">
                <div className="prose prose-sm md:prose-base max-w-none">
                  <p className="text-gray-700 mb-6">
                    These Terms of Service ("Terms") govern your access to and use of GetStorm.io ("Storm," "we," "our," "us") and all related products and services (the "Service"). By using the Service, you agree to these Terms.
                  </p>
                  <p className="text-gray-700 mb-8">
                    If you do not agree, do not use the Service.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">1. Eligibility</h3>
                  <p className="text-gray-700 mb-4">You must:</p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Be at least 16 years old,</li>
                    <li>Have the authority to enter into a binding agreement, and</li>
                    <li>Use the Service in compliance with all applicable laws and regulations.</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">2. Accounts & Security</h3>
                  <p className="text-gray-700 mb-4">You are responsible for:</p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Maintaining accurate account information,</li>
                    <li>Keeping your login credentials confidential, and</li>
                    <li>All activity that occurs under your account.</li>
                  </ul>
                  <p className="text-gray-700 mb-6">
                    You agree to notify us immediately of any unauthorized access or suspicious activity. We may suspend or terminate accounts that violate these Terms.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">3. Use of the Service</h3>
                  <p className="text-gray-700 mb-4">You may use Storm only for lawful, authorized purposes. You agree not to:</p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Upload malicious code or attempt to disrupt or degrade the Service,</li>
                    <li>Reverse-engineer, decompile, or attempt to access non-public areas of the platform,</li>
                    <li>Circumvent authentication or security measures,</li>
                    <li>Use the Service to store unlawful or harmful content, or</li>
                    <li>Misrepresent your identity or affiliation.</li>
                  </ul>
                  <p className="text-gray-700 mb-6">
                    Storm reserves the right to enforce usage limits or remove content that violates these Terms.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">4. Subscriptions, Billing & Refunds</h3>
                  
                  <h4 className="text-base font-semibold text-gray-900 mt-6 mb-3">4.1 Subscriptions & Billing</h4>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Certain features require a paid subscription.</li>
                    <li>Fees are billed in advance and are non-refundable except as outlined in Section 4.2.</li>
                    <li>Subscriptions renew automatically unless canceled prior to the renewal date.</li>
                    <li>By subscribing, you authorize Storm (or our payment processor) to charge the applicable fees.</li>
                    <li>We may update pricing with reasonable notice.</li>
                  </ul>

                  <h4 className="text-base font-semibold text-gray-900 mt-6 mb-3">4.2 Refunds</h4>
                  <p className="text-gray-700 mb-4">
                    Storm subscriptions and usage fees are billed in advance and are generally non-refundable, except under the following circumstances:
                  </p>

                  <p className="text-gray-700 mb-3 font-semibold">(a) Billing Errors</p>
                  <p className="text-gray-700 mb-4">
                    If you believe you were incorrectly charged—such as duplicate charges, incorrect amounts, or subscription tier errors—you may request a refund within 30 days of the charge. We will investigate and correct any verified billing errors.
                  </p>

                  <p className="text-gray-700 mb-3 font-semibold">(b) Prohibited Refund Circumstances</p>
                  <p className="text-gray-700 mb-3">Refunds will not be issued for:</p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Partial months of service,</li>
                    <li>Unused time during an active subscription,</li>
                    <li>Failure to cancel prior to renewal,</li>
                    <li>Subscription downgrades during an active billing cycle, or</li>
                    <li>Accounts terminated for violations of these Terms.</li>
                  </ul>

                  <p className="text-gray-700 mb-3 font-semibold">(c) Refund Requests</p>
                  <p className="text-gray-700 mb-3">To request a refund, contact Storm support with:</p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Your account email address,</li>
                    <li>Transaction details, and</li>
                    <li>A description of the issue.</li>
                  </ul>
                  <p className="text-gray-700 mb-6">
                    Refunds are processed back to the original payment method when possible.
                  </p>

                  <p className="text-gray-700 mb-3 font-semibold">(d) Chargebacks</p>
                  <p className="text-gray-700 mb-3">Initiating a chargeback without first contacting Storm may result in:</p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Immediate account suspension,</li>
                    <li>Denial of future refunds, and/or</li>
                    <li>Additional verification requirements to reinstate service.</li>
                  </ul>
                  <p className="text-gray-700 mb-6">
                    We encourage customers to contact us directly before initiating any payment disputes.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">5. Content Ownership</h3>
                  
                  <h4 className="text-base font-semibold text-gray-900 mt-6 mb-3">5.1 Your Content</h4>
                  <p className="text-gray-700 mb-6">
                    You retain ownership of all SWPPP data, project information, files, and materials you upload ("User Content"). You grant Storm a limited license to host, store, process, display, and transmit User Content solely to operate and improve the Service.
                  </p>

                  <h4 className="text-base font-semibold text-gray-900 mt-6 mb-3">5.2 Our Content</h4>
                  <p className="text-gray-700 mb-6">
                    All software, trademarks, features, designs, and intellectual property remain the property of Storm and its licensors. You may not copy, modify, redistribute, or create derivative works from the Service without prior written permission.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">6. Privacy</h3>
                  <p className="text-gray-700 mb-6">
                    Your use of the Service is governed by our Privacy Policy, which is incorporated by reference into these Terms.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">7. Service Availability</h3>
                  <p className="text-gray-700 mb-6">
                    We strive for consistent uptime, but we do not guarantee continuous availability, error-free operation, or complete data recovery in all circumstances. We may modify, suspend, or discontinue any part of the Service at any time.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">8. Termination</h3>
                  <p className="text-gray-700 mb-4">You may stop using the Service at any time. We may suspend or terminate your access if:</p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>You violate these Terms,</li>
                    <li>Required by law, or</li>
                    <li>Necessary to protect the Service, our users, or our business.</li>
                  </ul>
                  <p className="text-gray-700 mb-6">
                    Upon termination, we may delete your data after a reasonable period unless prohibited by law or required for business or compliance purposes.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">9. Disclaimers</h3>
                  <p className="text-gray-700 mb-6">
                    The Service is provided "as is" and "as available" without warranties of any kind, express or implied, including fitness for a particular purpose, non-infringement, accuracy, reliability, or availability. Use of the Service is at your own risk.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">10. Limitation of Liability</h3>
                  <p className="text-gray-700 mb-6">
                    To the maximum extent permitted by law, Storm is not liable for indirect, incidental, consequential, special, or punitive damages. Storm's total liability to you for any claim will not exceed the amount paid by you in the 12 months preceding the event giving rise to the claim.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">11. Indemnification</h3>
                  <p className="text-gray-700 mb-6">
                    You agree to indemnify and hold Storm harmless from any claims, damages, losses, liabilities, and expenses (including attorneys' fees) arising out of your use or misuse of the Service, your violation of these Terms, or your User Content.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">12. Governing Law</h3>
                  <p className="text-gray-700 mb-6">
                    These Terms are governed by the laws of the State of Michigan, without regard to conflict-of-law principles.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">13. Changes to the Terms</h3>
                  <p className="text-gray-700 mb-6">
                    We may update these Terms periodically. Updated Terms become effective upon posting. Continued use of the Service after changes are posted constitutes acceptance of the updated Terms.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 md:px-8 py-4 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={onClose}
                  className="w-full md:w-auto px-6 py-2 bg-storm-primary text-white rounded-full font-semibold hover:bg-storm-secondary transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}


