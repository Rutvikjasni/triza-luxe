'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Eye, ExternalLink } from 'lucide-react'
import { Product } from '@/types'
import { Button } from '@/components/ui/button'
import { AddToCartButton } from './AddToCartButton'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-black/5 border border-gold/10 mb-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlays and Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.best_seller && (
            <span className="bg-gold text-black text-xs font-bold px-2 py-1 uppercase tracking-wider">
              Best Seller
            </span>
          )}
          {product.trending && (
            <span className="bg-white text-black text-xs font-bold px-2 py-1 uppercase tracking-wider">
              Trending
            </span>
          )}
        </div>

        {/* Action Buttons (appear on hover) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out flex flex-col gap-2 z-10">
          <Link href={`/product/${product.slug}`} className="w-full cursor-pointer">
            <Button variant="secondary" className="w-full bg-white/90 hover:bg-white text-black backdrop-blur-sm rounded-none cursor-pointer">
              <Eye className="w-4 h-4 mr-2" />
              VIEW DETAILS
            </Button>
          </Link>
          <AddToCartButton 
            product={product} 
            className="w-full bg-gold hover:bg-gold/90 text-black rounded-none h-10 text-sm font-medium tracking-widest cursor-pointer"
            showIcon={true}
          />
        </div>
      </div>

      <div className="flex flex-col space-y-1">
        <p className="text-xs text-white/50 tracking-widest uppercase">
          {product.category?.name || product.category_id}
        </p>
        <h3 className="text-lg font-serif text-white group-hover:text-gold transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-white font-medium tracking-wider">
          ₹{product.price.toLocaleString('en-IN')}
        </p>
      </div>
    </motion.div>
  )
}
