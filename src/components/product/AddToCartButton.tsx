'use client'

import React from 'react'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart, CartItem } from '@/store/CartContext'
import { Product } from '@/types'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface AddToCartButtonProps {
  product: Product
  className?: string
  showIcon?: boolean
  text?: string
}

export function AddToCartButton({ product, className, showIcon = true, text = "ADD TO CART" }: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const router = useRouter()

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      router.push('/auth/login')
      return
    }

    const item: CartItem = {
      id: product.id,
      title: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    }
    addToCart(item)
  }

  return (
    <Button 
      onClick={handleAddToCart}
      className={className || "w-full bg-gold hover:bg-gold/90 text-black font-bold tracking-widest text-lg rounded-none transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"}
    >
      {showIcon && <ShoppingBag className="w-5 h-5 mr-3" />}
      {text}
    </Button>
  )
}
