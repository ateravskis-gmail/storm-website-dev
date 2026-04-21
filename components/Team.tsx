'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

type TeamMember = {
  name: string
  credentials?: string
  role: string
  image: string
  bio: string
}

const teamMembers: TeamMember[] = [
  {
    name: 'Danielle Teravskis',
    credentials: 'QSD/QSP #84663, CESSWI, Connections Course',
    role: 'Owner',
    image: '/DaniellePictures-6.jpg',
    bio: 'Danielle is a consultant and biologist who has worked in the environmental industry for five years.',
  },
  {
    name: 'Andrew Teravskis',
    role: 'Chief Executive Officer',
    image: '/1743179351400.jpeg',
    bio: 'Andrew is the leader of Storm and has been involved in the environmental industry for nearly two decades, most notably as the filmmaker at WGR Southwest.',
  },
  {
    name: 'John Teravskis',
    credentials: 'QSD #00022, CPESC, CESSWI, QISP, ToR',
    role: 'Chief Compliance Officer',
    image: '/IMG_2987.jpeg',
    bio: 'John is an environmental industry veteran, book author, and Office Manager at WGR Southwest.',
  },
  {
    name: 'Michael Sudyk',
    role: 'Chief Technical Officer',
    image: '/EC_Group_headshots.jpg',
    bio: 'Mike is the CEO of Manna Studios, a boutique software development company located in Grand Rapids, Michigan.',
  },
]

export default function Team() {
  return (
    <section id="team" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-3">Our Team</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Made by QSDs, For QSDs</h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-2xl border border-gray-100 bg-white shadow-lg shadow-black/5 overflow-hidden"
            >
              <div className="group relative aspect-[4/5]">
                <Image src={member.image} alt={member.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-storm-dark/90 via-storm-dark/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
                  <p className="text-sm leading-relaxed text-white">{member.bio}</p>
                </div>
              </div>

              <div className="p-5 text-center">
                <p className="text-xl font-semibold text-gray-900">{member.name}</p>
                <p className="mt-1 text-sm font-medium text-storm-primary">{member.role}</p>
                <p className="mt-1 min-h-[1.5rem] text-sm text-gray-600">
                  {member.credentials ? member.credentials : '\u00A0'}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
