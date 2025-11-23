'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, ReactNode } from 'react'

const features = [
  {
    title: 'Lightning Fast',
    description: (
      <>
        Generate compliant SWPPPs in minutes, not days. Our template and guided process <span className="font-bold text-gradient">cut writing time by 86%</span> (based on internal survey data).
      </>
    ),
    gradient: 'from-yellow-400 via-orange-500 to-red-500',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Built for Your Team',
    description: (
      <>
   <span className="font-bold text-gradient">Unlimited seats</span> allow you to invite your entire SWPPP writing team. Thanks to Storm&apos;s cloud-based system, 
   your team can effortlessly collaborate and review SWPPPs from the office, the field, or at home.
   </>
    ),
    gradient: 'from-green-400 via-emerald-500 to-teal-600',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Easy Revisions',
    description: (
      <>
      Keep your projects up-to-date without breaking a sweat, with Storm&apos;s revisions tracking feature. Revise, certify, and sign all in the app.
      </>
    ),
    gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: 'Professional Templates',
    description: (
      <>
      Built on the Connections Course SWPPP template, with many other templates in development. Custom templates are available for purchase.
      </>
    ),
    gradient: 'from-blue-400 via-indigo-500 to-purple-600',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Automatic Risk Determination',
    description: (
      <>
      Storm uses your project location to automatically query the R, K, LS, and Receiving Water Risk datasets to determine your project&apos;s overall risk level.
      </>
    ),
    gradient: 'from-purple-400 via-pink-500 to-rose-600',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  {
    title: 'Smart Discharge Mapping',
    description: (
      <>
      Storm&apos;s built-in discharge mapping tools allow you to quickly and clearly map your project&apos;s discharge points.
      </>
    ),
    gradient: 'from-violet-400 via-purple-500 to-fuchsia-600',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
]

export default function Features() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="features" className="py-32 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_1px_1px,rgb(0,0,0)_1px,transparent_0)] [background-size:24px_24px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={mounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Everything You Need to Write
            <span className="block text-gradient mt-2">Compliant Construction SWPPPs</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Powerful features designed to make SWPPP writing faster, easier, and more accurate than ever before.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={mounted ? { opacity: 0, y: 40 } : { opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ y: -12, scale: 1.01 }}
              className="group relative"
            >
              {/* Premium Glass Card */}
              <div className="relative h-full rounded-3xl overflow-hidden group/card z-[2]">
                {/* Uniform glass effect across entire card */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-3xl" />
                <div className="absolute inset-0 bg-white/25 backdrop-blur-2xl rounded-3xl" />
                
                {/* Premium border with inner glow */}
                <div className="absolute inset-0 rounded-3xl border border-white/60" />
                <div className="absolute inset-[1px] rounded-3xl border border-white/40" />
                
                {/* Sophisticated shadow system */}
                <div className="absolute -inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] transition-shadow duration-500" />
                
                {/* Gradient accent overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-700`} />
                
                {/* Premium lighting effects */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700`} />
                <div className={`absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr ${feature.gradient} opacity-0 group-hover:opacity-5 blur-2xl transition-opacity duration-700`} />
                
                {/* Content container */}
                <div className="relative h-full p-10 lg:p-12">
                
                  {/* Premium Icon Container */}
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative mb-8"
                  >
                    {/* Multi-layer glow system */}
                    <div className={`absolute -inset-4 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700`} />
                    <div className={`absolute -inset-2 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-15 blur-xl transition-opacity duration-500`} />
                    
                    {/* Icon glass container */}
                    <div className="relative">
                      {/* Outer glass ring */}
                      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Main icon container */}
                      <div className={`relative w-20 h-20 rounded-3xl bg-gradient-to-br ${feature.gradient} p-5 text-white shadow-2xl group-hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-500`}>
                        {/* Animated gradient shimmer */}
                        <motion.div
                          animate={{
                            backgroundPosition: ['0% 0%', '100% 100%'],
                          }}
                          transition={{
                            duration: 5,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'easeInOut',
                          }}
                          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-70`}
                          style={{
                            backgroundSize: '200% 200%',
                          }}
                        />
                        
                        {/* Premium shine overlay */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/40 via-white/10 to-transparent opacity-60" />
                        <motion.div
                          initial={{ x: '-100%', opacity: 0 }}
                          whileHover={{ x: '100%', opacity: 1 }}
                          transition={{ duration: 0.6 }}
                          className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        />
                        
                        {/* Icon with premium styling */}
                        <div className="relative z-10 w-full h-full filter drop-shadow-2xl">
                          {feature.icon}
                        </div>
                        
                        {/* Inner highlight */}
                        <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-white/20 blur-sm" />
                      </div>
                      
                      {/* Premium corner accents */}
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-br from-white/60 to-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-lg" />
                      <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-gradient-to-tr from-white/40 to-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-md" />
                    </div>
                  </motion.div>

                  {/* Premium Typography */}
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-900 group-hover:text-storm-primary transition-colors duration-500 tracking-tight leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-[15px] lg:text-base font-light relative z-10">
                    {feature.description}
                  </p>

                  {/* Premium bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px]">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className={`h-full bg-gradient-to-r ${feature.gradient} origin-left`}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-20 blur-sm`} />
                  </div>
                  
                  {/* Subtle texture overlay */}
                  <div className="absolute inset-0 rounded-3xl opacity-[0.015] bg-[radial-gradient(circle_at_2px_2px,black_1px,transparent_0)] [background-size:16px_16px] pointer-events-none" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

