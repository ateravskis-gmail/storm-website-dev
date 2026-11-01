'use client'

import { useEffect, useRef } from 'react'

type FeatureVideoProps = {
  path: string
  file: string
  label: string
  phone?: boolean
  id?: string
  onEnded?: () => void
}

export default function FeatureVideo({ path, file, label, id, onEnded, phone = false }: FeatureVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let visible = false
    const updatePlayback = () => {
      if (visible && !document.hidden && !preference.matches) {
        void video.play().catch(() => { /* Keep the poster if autoplay is unavailable. */ })
      } else {
        video.pause()
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      updatePlayback()
    }, { threshold: 0.25 })
    observer.observe(video)
    preference.addEventListener('change', updatePlayback)
    document.addEventListener('visibilitychange', updatePlayback)
    return () => {
      observer.disconnect()
      preference.removeEventListener('change', updatePlayback)
      document.removeEventListener('visibilitychange', updatePlayback)
      video.pause()
    }
  }, [path, file])

  return (
    <div className="relative aspect-[16/10] w-full">
    <video
      key={`${path}/${file}`}
      id={id}
      ref={videoRef}
      muted
      playsInline
      loop={!onEnded}
      onEnded={() => {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) onEnded?.()
      }}
      preload="metadata"
      width={phone ? 800 : 1600}
      height={phone ? 1100 : 1000}
      poster={`${path}/poster.png`}
      aria-label={label}
      className={phone
        ? 'absolute inset-y-0 left-1/2 block h-full w-auto max-w-full -translate-x-1/2 object-contain'
        : 'block aspect-[16/10] h-auto w-full bg-white object-contain shadow-[0_8px_28px_rgba(15,23,42,0.06)]'}
    >
      <source src={`${path}/${file}.webm`} type="video/webm" />
      <source src={`${path}/${file}.mp4`} type="video/mp4" />
    </video>
    </div>
  )
}
