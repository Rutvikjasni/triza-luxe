'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '@/store/CartContext'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useRouter, usePathname } from 'next/navigation'

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, totalPrice } = useCart()
  const router = useRouter()
  const pathname = usePathname()

  if (pathname.startsWith('/admin')) return null

  const handleCheckout = () => {
    setIsCartOpen(false)
    router.push('/checkout')
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[400px] bg-black border-l border-gold/20 z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gold/20">
              <span className="text-xl font-serif tracking-widest text-gold uppercase flex items-center gap-3">
                <ShoppingBag size={24} />
                Your Cart
              </span>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-white/80 hover:text-gold transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-white/50 space-y-4">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p className="text-sm uppercase tracking-widest">Your cart is empty</p>
                  <Button 
                    onClick={() => setIsCartOpen(false)}
                    variant="outline"
                    className="border-gold/30 text-gold hover:bg-gold hover:text-black mt-4"
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-white/5 p-3 rounded-xl border border-white/10">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white/10">
                      <Image
                        src={item.image || '/placeholder-jewelry.jpg'}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium line-clamp-2 pr-4 text-white/90">{item.title}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-white/40 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex justify-between items-end mt-2">
                        <span className="text-gold font-serif">₹{item.price.toLocaleString('en-IN')}</span>
                        <div className="flex items-center gap-3 bg-black border border-white/20 rounded-full px-2 py-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-white/60 hover:text-white"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-white/60 hover:text-white"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-gold/20 bg-black/90 backdrop-blur-md">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm text-white/70 uppercase tracking-wider">Subtotal</span>
                  <span className="text-2xl font-serif text-gold tracking-wider">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-gold hover:bg-gold/80 text-black font-bold tracking-widest py-6 text-sm"
                >
                  PROCEED TO CHECKOUT
                </Button>
                <p className="text-[10px] text-center text-white/40 mt-4 tracking-widest uppercase">
                  Shipping & taxes calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
