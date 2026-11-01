'use client'

import { useState } from 'react'
import FeatureVideo from './FeatureVideo'

const steps = [
  {
    label: 'Map it',
    platform: 'Storm Mapping',
    description: 'Draw a Compost Sock on the site plan and measure its length.',
    path: '/demos/compost-drawing',
    file: 'compost-drawing',
  },
  {
    label: 'Write it',
    platform: 'Storm SWPPP Writing',
    description: 'Drag the mapped 128.04 ft BMP into SF-1, with its installation notes and Braden Road location.',
    path: '/demos/compost-sock',
    file: 'compost-sock',
  },
  {
    label: 'Inspect it',
    platform: 'Weekly Inspections',
    description: 'Open that same BMP in Weekly, review its specs, add a captioned photo, and mark it Pass.',
    path: '/demos/weekly-inspection-phone',
    file: 'weekly-inspection-phone',
  },
]

export default function BMPWorkflowDemo({ title, descriptions }: { title: string; descriptions: string[] }) {
  const [selected, setSelected] = useState(0)
  const step = steps[selected]

  return (
    <>
      <div className="lg:col-span-5">
        <h3 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">{title}</h3>
        <p className="mt-4 text-base leading-relaxed text-slate-600">{descriptions[3]}</p>
        <div role="group" aria-label="BMP workflow demos" className="mt-6 flex flex-col gap-3">
        {steps.map((item, index) => (
          <button
            key={item.file}
            type="button"
            aria-pressed={selected === index}
            aria-controls="bmp-workflow-player"
            onClick={() => setSelected(index)}
            className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-storm-primary ${
              selected === index
                ? 'border-storm-primary bg-sky-50 text-storm-dark'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${selected === index ? 'bg-storm-dark text-white' : 'bg-slate-100 text-slate-500'}`}>
              {index + 1}
            </span>
            <span>
              <span className="block text-base font-semibold">{item.label}</span>
              <span className="mt-0.5 block text-xs text-slate-500">{item.platform}</span>
              <span className="mt-2 block text-sm leading-relaxed text-slate-600">{descriptions[index]}</span>
            </span>
          </button>
        ))}
        </div>
      </div>

      <div className="min-w-0 lg:col-span-7">
        <FeatureVideo
          phone={step.file === 'weekly-inspection-phone'}
          id="bmp-workflow-player"
          path={step.path}
          file={step.file}
          label={`${step.label}: ${step.description}`}
          onEnded={() => setSelected((current) => (current + 1) % steps.length)}
        />
      </div>
    </>
  )
}
