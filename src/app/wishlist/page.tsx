'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Trash2, ShoppingCart, ArrowRight } from 'lucide-react'
import { useWishlist } from '@/store/WishlistContext'
import { useCart } from '@/store/CartContext'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const router = useRouter()

  const handleAddToCart = async (product: any) => {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      router.push('/auth/login')
      return
    }

    addToCart({
      id: product.id,
      title: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
    removeFromWishlist(product.id)
  }

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Your Wishlist</h1>
            <p className="text-white/60 tracking-wider">
              {items.length} {items.length === 1 ? 'Item' : 'Items'}
            </p>
          </div>
          {items.length > 0 && (
            <Button 
              variant="outline" 
              onClick={clearWishlist}
              className="text-red-500 border-red-500/50 hover:bg-red-500/10"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Wishlist
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-32 bg-black/50 backdrop-blur-sm border border-gold/20">
            <h2 className="text-2xl font-serif text-white mb-4">Your wishlist is empty</h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              Save your favorite pieces here and come back to them anytime.
            </p>
            <Link href="/collections">
              <Button className="bg-gold hover:bg-gold/90 text-black tracking-widest px-8">
                EXPLORE COLLECTION
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col bg-white/5 border border-white/10 hover:border-gold/30 transition-colors backdrop-blur-sm"
              >
                <Link href={`/product/${item.slug}`} className="relative aspect-[4/5] overflow-hidden bg-black/5 block">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Remove button */}
                  <button 
                    onClick={(e) => {
                      e.preventDefault()
                      removeFromWishlist(item.id)
                    }}
                    className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur p-2 rounded-full text-white/80 hover:text-red-500 hover:bg-black transition-all shadow-sm"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </Link>

                <div className="p-4 flex flex-col flex-grow space-y-3">
                  <div>
                    <p className="text-xs text-white/50 tracking-widest uppercase mb-1">
                      {item.category?.name || item.category_id}
                    </p>
                    <Link href={`/product/${item.slug}`}>
                      <h3 className="text-lg font-serif text-white group-hover:text-gold transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                    </Link>
                  </div>
                  
                  <div className="flex items-end justify-between mt-auto pt-4">
                    <p className="text-white font-medium tracking-wider">
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>
                    
                    <Button 
                      onClick={() => handleAddToCart(item)}
                      className="bg-gold hover:bg-gold/90 text-black transition-colors rounded-none px-4 h-10"
                      size="sm"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
