'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export function BrandStory() {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden z-10">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl -z-10" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/10 blur-[100px] rounded-full translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
              Crafting <span className="text-gold italic">Excellence</span>, <br />
              Defining Luxury.
            </h2>
            <div className="w-16 h-[1px] bg-gold" />
            <div className="space-y-4 text-white/70 font-light leading-relaxed">
              <p>
                At Triza Luxe, we believe that true elegance shouldn't come with compromise. Our journey began with a singular vision: to democratize the luxury jewelry experience while maintaining uncompromising standards of craftsmanship and design.
              </p>
              <p>
                Every piece in our collection is a testament to meticulous attention to detail, utilizing premium materials and innovative techniques to create imitation jewelry that rivals the finest precious metals and stones.
              </p>
              <p>
                Experience the weight, the brilliance, and the unmatched aura of Triza Luxe.
              </p>
            </div>
            
            <div className="pt-4 grid grid-cols-3 gap-6 text-center lg:text-left">
              <div>
                <h4 className="text-3xl font-serif text-gold mb-1">10k+</h4>
                <p className="text-xs tracking-widest text-white/50 uppercase">Customers</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif text-gold mb-1">500+</h4>
                <p className="text-xs tracking-widest text-white/50 uppercase">Designs</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif text-gold mb-1">100%</h4>
                <p className="text-xs tracking-widest text-white/50 uppercase">Quality</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square lg:aspect-[4/5] border border-gold/20 p-4"
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=1000&auto=format&fit=crop"
                alt="Crafting Jewelry"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-center border border-white/20 p-6 backdrop-blur-md bg-black/20">
                <p className="font-serif text-xl text-white italic">"Where Art Meets Accessible Luxury"</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
