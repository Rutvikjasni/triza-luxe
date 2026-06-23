'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Eye, ExternalLink, Heart } from 'lucide-react'
import { Product } from '@/types'
import { Button } from '@/components/ui/button'
import { AddToCartButton } from './AddToCartButton'
import { useWishlist } from '@/store/WishlistContext'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const inWishlist = isInWishlist(product.id)
  const router = useRouter()

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      router.push('/auth/login')
      return
    }

    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300" />
        
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

        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/20 hover:bg-black/50 backdrop-blur-sm text-white transition-all"
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-gold text-gold' : ''}`} />
        </button>

        {/* Action Buttons (always visible on mobile, appear on hover on desktop) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-0 lg:translate-y-full lg:group-hover:translate-y-0 transition-transform duration-300 ease-in-out flex flex-col gap-2 z-10">
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
