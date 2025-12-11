'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

interface PrivacyPolicyModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
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
                  Privacy Policy — Storm
                </h2>
                <p className="text-sm text-gray-500">Last Updated: November 2025</p>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 md:py-8">
                <div className="prose prose-sm md:prose-base max-w-none">
                  <p className="text-gray-700 mb-6">
                    GetStorm.io ("Storm," "we," "our," or "us") provides software tools that help engineers, consultants, contractors, and organizations streamline SWPPP writing workflows, generate compliance documents, and manage project documentation. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use Storm.io and related services (the "Service").
                  </p>
                  <p className="text-gray-700 mb-8">
                    If you do not agree with any part of this Privacy Policy, please discontinue use of the Service.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">1. Information We Collect</h3>
                  
                  <h4 className="text-base font-semibold text-gray-900 mt-6 mb-3">1.1 Information You Provide to Us</h4>
                  <p className="text-gray-700 mb-4">We may collect information that you voluntarily provide when using the Service, including:</p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li><strong>Account information:</strong> name, email address, phone number, organization name, password.</li>
                    <li><strong>Form submissions:</strong> SWPPP data, project information, files, site documentation.</li>
                    <li><strong>Payment information:</strong> processed through third-party providers (e.g., Stripe). We do not store full payment card details.</li>
                    <li><strong>Support inquiries:</strong> messages, attachments, or troubleshooting logs.</li>
                  </ul>

                  <h4 className="text-base font-semibold text-gray-900 mt-6 mb-3">1.2 Information Collected Automatically</h4>
                  <p className="text-gray-700 mb-4">When you use the Service, we automatically collect:</p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li><strong>Device and usage data:</strong> IP address, browser type, operating system, location, pages viewed, access timestamps.</li>
                    <li><strong>Log data:</strong> error logs, performance metrics, request metadata.</li>
                    <li><strong>Cookies and tracking technologies:</strong> used to maintain sessions and improve user experience.</li>
                  </ul>

                  <h4 className="text-base font-semibold text-gray-900 mt-6 mb-3">1.3 Information From Third Parties</h4>
                  <p className="text-gray-700 mb-4">We may receive information from:</p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Authentication providers (if you log in using SSO)</li>
                    <li>Payment processors</li>
                    <li>Organizations you are affiliated with who add you as a user</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h3>
                  <p className="text-gray-700 mb-4">We use collected information to:</p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Provide, maintain, and improve the Storm platform</li>
                    <li>Personalize your experience</li>
                    <li>Generate SWPPP documents and compliance forms</li>
                    <li>Facilitate account creation and authentication</li>
                    <li>Process payments and manage subscriptions</li>
                    <li>Send service-related notices, updates, and support responses</li>
                    <li>Detect, prevent, and respond to fraud or technical issues</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                  <p className="text-gray-700 mb-6 font-semibold">
                    We do not sell personal information.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">3. How We Share Information</h3>
                  <p className="text-gray-700 mb-4">We may share information with:</p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li><strong>Service providers:</strong> hosting platforms, analytics tools, cloud storage, email delivery services, payment processors</li>
                    <li><strong>Your organization/account owner:</strong> if you are added to an organizational account</li>
                    <li><strong>Legal authorities:</strong> when required by law or to protect Storm's rights, security, and users</li>
                    <li><strong>Business transfers:</strong> in the event of a merger, acquisition, or asset sale</li>
                  </ul>
                  <p className="text-gray-700 mb-6 font-semibold">
                    We do not share SWPPP data with unrelated third parties.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">4. Data Security</h3>
                  <p className="text-gray-700 mb-4">We implement technical and organizational measures to protect your information, including:</p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Encryption in transit (TLS)</li>
                    <li>Access controls and role-based permissions</li>
                    <li>Regular security reviews and monitoring</li>
                  </ul>
                  <p className="text-gray-700 mb-6">
                    However, no online system is fully secure, and we cannot guarantee absolute protection.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">5. Data Retention</h3>
                  <p className="text-gray-700 mb-4">We retain information for as long as:</p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Your account is active, or</li>
                    <li>Required to provide the Service, or</li>
                    <li>Necessary to satisfy legal or business obligations</li>
                  </ul>
                  <p className="text-gray-700 mb-6">
                    You may request deletion of your data at any time (see Section 8).
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">6. Children's Privacy</h3>
                  <p className="text-gray-700 mb-6">
                    Storm is not designed for individuals under 16, and we do not knowingly collect data from minors. If we learn that we have collected data from a minor, we will delete it promptly.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">7. International Users</h3>
                  <p className="text-gray-700 mb-6">
                    If you access Storm from outside the United States, you understand that your information may be transferred to and processed in the U.S., where privacy laws may differ.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">8. Your Rights</h3>
                  <p className="text-gray-700 mb-4">Depending on your jurisdiction, you may have the right to:</p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                    <li>Access, update, or delete your information</li>
                    <li>Request a copy of your data</li>
                    <li>Object to or restrict processing</li>
                    <li>Withdraw consent (where applicable)</li>
                  </ul>
                  <p className="text-gray-700 mb-6">
                    To exercise these rights, email us at: <a href="mailto:support@getstorm.io" className="text-storm-primary hover:underline">support@getstorm.io</a>
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">9. Changes to This Policy</h3>
                  <p className="text-gray-700 mb-6">
                    We may update this Privacy Policy periodically. The "Last Updated" date reflects the current version. Changes become effective upon posting to the website.
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
