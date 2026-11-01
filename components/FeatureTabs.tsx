'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import BMPWorkflowDemo from './BMPWorkflowDemo'
import FeatureVideo from './FeatureVideo'

type FeatureTab = {
  id: string
  label: string
  title: string
  features: string[]
  image: string | null
  imageAlt: string
}

const allTabs: FeatureTab[] = [
  {
    id: 'swppp-writing',
    label: 'SWPPP Writing',
    title: 'An innovative approach to SWPPP Writing.',
    features: [
      'A guided workflow leads you through the SWPPP creation process',
      'Work through the SWPPP in any order, or send sections out for someone else to fill in',
      'Add text formatting and photos',
      'Built in revision tracking and error-checking',
      'Certify, sign, and export a submission-ready PDF',
    ],
    image: '/ProjectScreen.png',
    imageAlt: 'Storm project screen for entering SWPPP project information',
  },
  {
    id: 'mapping',
    label: 'Mapping',
    title: 'The first mapping tool built for SWPPPs.',
    features: [
      'CAD-style measurements, snapping, and calibration',
      'Drawing tools specific to storm water and erosion control',
      'Auto-generated map legend',
      'Export an accurate material takeoff showing amounts of all BMPs on the map',
      'Download the finished map as a print-ready PDF',
    ],
    image: '/swppp-mapping.png',
    imageAlt: 'Storm SWPPP map with erosion controls on a site plan',
  },
  {
    id: 'inspections',
    label: 'Inspections',
    title: 'The first inspection app that connects to your SWPPP.',
    features: [
      'Weekly, the stormwater inspection app, is included with Storm',
      'Inspect the same BMPs that are specced in the SWPPP',
      'NOAA weather reports and QPE alerts for the project',
      'Easily log and manage your sampling equipment and calibration records',
      'Certify and send inspection reports as PDFs',
    ],
    image: null,
    imageAlt: 'Weekly stormwater inspection app',
  },
  {
    id: 'centralized-bmps',
    label: 'Centralized BMPs',
    title: 'Your map, SWPPP, and inspection tool are all synced.',
    features: [
      'Draw the BMP on your site map and enter specs and installation instructions',
      'Drag the BMP into the appropriate category, and easily edit any information (which will immediately sync to the map)',
      'The same BMP will appear with its installation specs, ready for photos and an inspection status',
      'Storm automatically establishes a "source of truth" for each BMP in your plan.',
    ],
    image: null,
    imageAlt: 'Centralized BMP library in Storm',
  },
  {
    id: 'risk-rusle2',
    label: 'Risk Level and RUSLE2',
    title: 'Risk level from the project location',
    features: [
      'Overall risk level determined from where the project sits',
      'R, K, LS, and receiving water risk queried from location data',
      'RUSLE2 soil-loss modeling for permits that require it',
      'Results carried into the SWPPP with the rest of the plan',
    ],
    image: null,
    imageAlt: 'Storm risk level and RUSLE2 results',
  },
  {
    id: 'smart-tools',
    label: 'Smart Tools',
    title: 'Checks that catch issues before you export',
    features: [
      'Validation that reviews the plan before it goes out the door',
      'Discharge mapping from inside the project',
      'Location lookups that fill risk inputs for you',
      'A revision history so every export stays traceable',
    ],
    image: null,
    imageAlt: 'Storm smart tools for SWPPP review',
  },
]

// Temporarily hidden; remove these IDs to restore the tabs.
const hiddenTabIds = new Set(['risk-rusle2', 'smart-tools'])
const tabs = allTabs.filter((tab) => !hiddenTabIds.has(tab.id))

function FeatureShot({ src, alt }: { src: string | null; alt: string }) {
  if (!src) {
    return (
      <div className="relative aspect-[16/10] w-full">
        <div className="feature-shot-mask absolute inset-0">
          <div className="absolute inset-y-4 right-0 left-[8%] lg:left-[18%] rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-sm" />
          <div className="absolute inset-y-10 right-8 left-[18%] lg:left-[28%] flex items-center justify-center rounded-xl border border-dashed border-slate-300/80 bg-white/70 text-sm font-medium text-slate-400">
            Screenshot
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative aspect-[16/10] w-full">
      <div className="feature-shot-blur-mask pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={src}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 720px"
          className="scale-105 object-contain object-right opacity-70 blur-xl"
        />
      </div>
      <div className="feature-shot-mask absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 720px"
          className="object-contain object-center lg:object-right"
        />
      </div>
    </div>
  )
}

export default function FeatureTabs() {
  const [activeId, setActiveId] = useState(tabs[0].id)
  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0]

  return (
    <section id="features" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-storm-primary">Features</p>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            The whole SWPPP workflow
          </h2>
        </div>

        <div
          role="tablist"
          aria-label="Product features"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0"
          onKeyDown={(event) => {
            if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
            event.preventDefault()
            const current = tabs.findIndex((tab) => tab.id === activeTab.id)
            const next =
              event.key === 'ArrowRight'
                ? (current + 1) % tabs.length
                : (current - 1 + tabs.length) % tabs.length
            setActiveId(tabs[next].id)
            document.getElementById(`feature-tab-${tabs[next].id}`)?.focus()
          }}
        >
          {tabs.map((tab) => {
            const selected = tab.id === activeTab.id
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`feature-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`feature-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(tab.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  selected
                    ? 'bg-storm-dark text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            role="tabpanel"
            id={`feature-panel-${activeTab.id}`}
            aria-labelledby={`feature-tab-${activeTab.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="mt-10 grid items-center gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-6"
          >
            {activeTab.id !== 'centralized-bmps' && (
            <div className="relative z-10 lg:col-span-5">
              <h3 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:col-span-5">
                {activeTab.title}
              </h3>
              <ul className="mt-6 list-disc space-y-3 pl-5 text-base leading-relaxed text-gray-700 marker:text-storm-primary md:text-lg">
                {activeTab.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
            )}

            {activeTab.id === 'centralized-bmps' ? (
              <BMPWorkflowDemo title={activeTab.title} descriptions={activeTab.features} />
            ) : activeTab.id === 'swppp-writing' ? (
              <div className="min-w-0 lg:col-span-7">
                <FeatureVideo
                  path="/demos/swppp-narrative"
                  file="swppp-narrative"
                  label="Write the SWPPP narrative, add a site photo, and attach a caption."
                />
              </div>
            ) : activeTab.id === 'mapping' ? (
              <div className="min-w-0 lg:col-span-7">
                <FeatureVideo
                  path="/demos/compost-drawing"
                  file="compost-drawing"
                  label="Draw a Compost Sock on the site plan, measure its length, and finish the mapped BMP."
                />
              </div>
            ) : activeTab.id === 'inspections' ? (
              <div className="min-w-0 lg:col-span-7">
                <FeatureVideo
                  phone
                  path="/demos/new-inspection-phone"
                  file="new-inspection-phone"
                  label="Create a Storm Business Park weekly inspection on a phone, open and close the forecast, and save a captioned rain gauge photo."
                />
              </div>
            ) : (
              <div className="pointer-events-none lg:col-span-7">
                <FeatureShot src={activeTab.image} alt={activeTab.imageAlt} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
