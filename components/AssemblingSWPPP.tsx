'use client'

import { useEffect, useRef, useState } from 'react'
import './assembling-swppp.css'

const sections = [
  { id: 'project', title: 'Project details', subtitle: 'Storm Business Park', color: '#38bdf8', x: 22, y: 80, rotation: -4 },
  { id: 'site', title: 'Site conditions', subtitle: 'SWPPP Narrative', color: '#a5b4fc', x: 365, y: 92, rotation: 4 },
  { id: 'soils', title: 'Soils & watershed', subtitle: 'Geotechnical Report', color: '#2dd4bf', x: 12, y: 258, rotation: -2 },
  { id: 'activities', title: 'Construction activities', subtitle: 'Who will be on site', color: '#fbbf24', x: 375, y: 270, rotation: 3 },
  { id: 'bmps', title: 'BMPs', subtitle: 'Best Management Practices', color: '#86efac', x: 28, y: 436, rotation: -4 },
  { id: 'maps', title: 'Site maps', subtitle: 'Show BMP placements', color: '#7dd3fc', x: 359, y: 448, rotation: 4 },
]

function CardDetail({ index, color }: { index: number; color: string }) {
  if (index === 0) return <g><path d="M30 83c-16-20 17-28 17-10 0 5-8 13-8 13Z" fill={color} opacity=".2"/><circle cx="38" cy="72" r="3" fill={color}/><path d="M65 69h108M65 81h76M26 105h180" stroke="#d6e0ec" strokeWidth="5" strokeLinecap="round"/></g>
  if (index === 1) return <g stroke="#d6e0ec" strokeWidth="5" strokeLinecap="round"><path d="M26 68h183M26 82h163M26 96h179M26 110h108"/><path d="M26 68h82" stroke={color}/></g>
  if (index === 2) return (
    <g>
      {/* A soil profile beside a plan-view catchment draining to a stream. */}
      <path d="M23 78Q40 71 58 78T91 78V91H23Z" fill="#dce9cd"/>
      <path d="M23 91H91V103L23 107Z" fill="#d7bd94"/>
      <path d="M23 107L91 103V118H23Z" fill="#a98d70"/>
      <path d="M23 78Q40 71 58 78T91 78" fill="none" stroke="#739b65" strokeWidth="2"/>
      <path d="M31 96h3m14 2h3m21-3h3m-39 16h3m18 0h3m18-3h3" stroke="#997c59" strokeWidth="1.5" strokeLinecap="round"/>
      <text x="24" y="65" fontSize="7" fontWeight="600" fill="#718096" letterSpacing=".6">SOIL PROFILE</text>
      <path d="M109 70L137 60 173 66 194 86 180 110 150 118 117 103Z" fill="#effaf7" stroke="#83b9a6" strokeWidth="1" strokeDasharray="3 2"/>
      <path d="M127 72L147 81 160 97M178 77L166 84 160 97" fill="none" stroke="#7dd3fc" strokeWidth="1.5"/>
      <path d="M151 66Q144 80 156 88T160 108Q158 116 178 120H214" fill="none" stroke="#269ac1" strokeWidth="3" strokeLinecap="round"/>
      <path d="m120 88 12 8m-5-7 5 7-8-1m42-21-7 8m1-7-1 7 7-2" fill="none" stroke="#5f9d8c" strokeWidth="1.3"/>
      <rect x="137" y="91" width="13" height="10" rx="1" fill="white" stroke="#359a83" strokeWidth="1.4"/>
      <text x="195" y="111" fontSize="7" fill="#269ac1" textAnchor="middle">STREAM</text>
    </g>
  )
  if (index === 3) return <g><path d="M29 69h177M29 89h177M29 109h177" stroke="#eef2f7" strokeWidth="9" strokeLinecap="round"/><path d="M29 69h55M85 89h69M156 109h50" stroke={color} strokeWidth="9" strokeLinecap="round"/></g>
  if (index === 4) return <g>{[68,88,108].map((y,i)=><g key={y}><circle cx="32" cy={y} r="7" fill={color} opacity=".25"/><path d={`M29 ${y}l2 2 4-4`} stroke="#16a34a" strokeWidth="1.5" fill="none"/><path d={`M51 ${y}h${[145,117,136][i]}`} stroke="#d6e0ec" strokeWidth="5" strokeLinecap="round"/></g>)}</g>
  return (
    <g fill="none" strokeLinejoin="round">
      {/* Civil base drawing with a road, parcels, footprints, and BMP overlays. */}
      <rect x="22" y="59" width="196" height="65" rx="3" fill="#f8fafc"/>
      <path d="M27 62H188V117H27Z" stroke="#64748b" strokeWidth=".8" strokeDasharray="4 2 1 2"/>
      <path d="M31 79H181M31 85H181M34 82H179" stroke="#475569" strokeWidth=".8"/>
      <path d="M34 82H179" stroke="white" strokeWidth=".9" strokeDasharray="7 4"/>
      <path d="M68 64V78M109 64V78M150 64V78M68 86V114M109 86V114M150 86V114" stroke="#94a3b8" strokeWidth=".65"/>
      {[37,78,119,160].map(x=><g key={x} stroke="#64748b" strokeWidth=".7"><path d={`M${x} 67h22v9h-22ZM${x} 92h22v16h-22Z`}/><path d={`M${x+3} 95h16v10h-16Z`} stroke="#cbd5e1"/></g>)}
      <path d="M31 89V113H180V89" stroke="#36966e" strokeWidth="2.5"/>
      <path d="M43 110v6m14-6v6m21-6v6m14-6v6m21-6v6m14-6v6m21-6v6m14-6v6" stroke="#216c50" strokeWidth="1"/>
      <path d="M54 69h110" stroke="#cf9b43" strokeWidth="2.2" strokeDasharray="5 2"/>
      <path d="m72 95 0 13m-3-4 3 4 3-4m41-9 0 13m-3-4 3 4 3-4m42-8 13 0m-4-3 4 3-4 3" stroke="#2599cd" strokeWidth="1.2"/>
      <circle cx="181" cy="101" r="4" stroke="#2599cd" strokeWidth="1.3" fill="white"/>
      <path d="M185 101h12" stroke="#2599cd" strokeWidth="1"/>
      <text x="199" y="104" fill="#50829b" stroke="none" fontSize="5.5">DP-1</text>
      <path d="M205 78V65m-3 5 3-5 3 5" stroke="#475569" strokeWidth="1"/>
      <text x="205" y="62" fill="#475569" stroke="none" fontSize="6" textAnchor="middle">N</text>
      <path d="M195 119h17m-17-2v4m8-4v4m9-4v4" stroke="#64748b" strokeWidth=".8"/>
    </g>
  )
}

export default function AssemblingSWPPP() {
  const root = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  useEffect(() => {
    let visible = false
    const update = () => setPlaying(visible && !document.hidden)
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update() }, { threshold: .15 })
    if (root.current) observer.observe(root.current)
    document.addEventListener('visibilitychange', update)
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update) }
  }, [])
  return (
    <div ref={root} className={`swppp-assembly ${playing ? 'is-playing' : ''}`}>
      <svg key="assembly-stable-cards" viewBox="0 0 640 690" role="img" aria-labelledby="assembly-title assembly-description" className="block h-auto w-full overflow-visible">
        <title id="assembly-title">Your project details. One complete SWPPP.</title>
        <desc id="assembly-description">Project details, site conditions, soils and watershed, construction activities, BMPs, and maps assemble into a SWPPP with the supplied Storm Business Park cover.</desc>
        <defs>
          <clipPath id="assembly-cover-clip"><rect x="167" y="112" width="306" height="398" rx="16"/></clipPath>
          <radialGradient id="assembly-glow"><stop stopColor="#38bdf8" stopOpacity=".18"/><stop offset="1" stopColor="#38bdf8" stopOpacity="0"/></radialGradient>
          <filter id="assembly-shadow" x="-50%" y="-40%" width="200%" height="200%"><feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#020617" floodOpacity=".28"/></filter>
        </defs>
        <ellipse cx="320" cy="340" rx="330" ry="320" fill="url(#assembly-glow)"/>
        <g className="assembly-pages" filter="url(#assembly-shadow)">
          {[3,2,1,0].map(i=><rect key={i} x={167+i*5} y={112+i*6} width="306" height="398" rx="16" fill={['#fff','#eaf0f8','#d4deec','#b9cadf'][i]} transform={`rotate(${i*1.7} 320 310)`}/>)}
          <path d="M197 151h130M197 173h236M197 188h211M197 231h236M197 249h236M197 267h206M197 310h236M197 328h217M197 346h236" stroke="#dce7f2" strokeWidth="6" strokeLinecap="round"/>
        </g>
        {sections.map((card,i)=><g key={card.id} transform={`translate(${card.x} ${card.y})`}>
          <g className={`assembly-card assembly-card-${i}`} style={{ '--dx': `${320-card.x-120}px`, '--dy': `${308-card.y-69}px`, '--tilt': `${card.rotation}deg` } as React.CSSProperties}>
            <rect width="240" height="138" rx="14" fill="#fff" filter="url(#assembly-shadow)"/>
            <rect x="18" y="19" width="4" height="21" rx="2" fill={card.color}/>
            <text x="32" y="29" fill="#172b46" fontSize="14" fontWeight="600">{card.title}</text>
            <text x="32" y="46" fill="#718096" fontSize="10">{card.subtitle}</text>
            <CardDetail index={i} color={card.color}/>
          </g>
        </g>)}
        <g className="assembly-cover">
          <rect x="167" y="112" width="306" height="398" rx="16" fill="white" filter="url(#assembly-shadow)"/>
          <g clipPath="url(#assembly-cover-clip)">
            <image href="/demos/assembling-swppp/cover.png" x="178" y="123" width="284" height="376" preserveAspectRatio="xMidYMid meet"/>
          </g>
          <rect x="167.5" y="112.5" width="305" height="397" rx="16" fill="none" stroke="#e2e8f0"/>
        </g>
        <g className="assembly-complete" textAnchor="middle">
          <rect x="220" y="553" width="200" height="31" rx="15.5" fill="#0d3547" stroke="#2dd4bf" strokeOpacity=".35"/>
          <circle cx="243" cy="569" r="7" fill="#34d399"/><path d="m240 569 2 2 4-4" fill="none" stroke="#063328" strokeWidth="1.5"/>
          <text x="329" y="573" fill="#bbf7d0" fontSize="11" fontWeight="500">One complete SWPPP</text>
          <text x="320" y="614" fill="white" fontSize="23" fontWeight="600">Time to create: 2 Hours</text>
        </g>
      </svg>
    </div>
  )
}
