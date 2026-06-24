'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ProductCard } from '@/components/product/ProductCard'
import { Product } from '@/types'

export function FeaturedCollection({ products }: { products: Product[] }) {

  return (
    <section className="py-24 bg-transparent relative z-10">
      <div className="absolute inset-0 bg-[#0a0a0a] -z-10 border-y border-gold/10" />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif text-white mb-4"
          >
            Featured <span className="text-gold italic">Collection</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-[1px] bg-gold"
          />
        </div>

        {products.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white/5 aspect-[4/5] mb-4" />
                <div className="bg-white/5 h-4 w-1/3 mb-2" />
                <div className="bg-white/5 h-6 w-3/4 mb-2" />
                <div className="bg-white/5 h-5 w-1/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
