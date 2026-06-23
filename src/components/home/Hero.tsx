'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-transparent">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-mangalsutra.png"
          alt="Luxury Jewelry Masterpiece"
          fill
          className="object-cover opacity-50 mix-blend-luminosity"
          priority
        />
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-gold text-sm tracking-[0.4em] uppercase mb-4 font-bold">
              The Essence of Elegance
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight">
              Unveil Your <br />
              <span className="text-gold-gradient italic">Radiance</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-lg font-light leading-relaxed">
              Discover our latest collection of premium imitation jewelry. Masterfully crafted to bring you unparalleled luxury without compromise.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/collections" className="w-full sm:w-auto">
              <Button className="bg-gold hover:bg-gold/80 text-black font-bold tracking-widest px-8 py-6 rounded-none group w-full">
                EXPLORE COLLECTION
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/collections" className="w-full sm:w-auto">
              <Button variant="outline" className="border-gold/50 text-gold hover:bg-gold/10 font-bold tracking-widest px-8 py-6 rounded-none w-full">
                VIEW NEW ARRIVALS
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
