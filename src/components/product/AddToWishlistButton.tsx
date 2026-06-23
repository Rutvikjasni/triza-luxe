'use client'

import React from 'react'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Product } from '@/types'
import { useWishlist } from '@/store/WishlistContext'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface AddToWishlistButtonProps {
  product: Product
  className?: string
  variant?: 'outline' | 'ghost' | 'default' | 'secondary'
}

export function AddToWishlistButton({ 
  product, 
  className,
  variant = 'outline'
}: AddToWishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const inWishlist = isInWishlist(product.id)
  const router = useRouter()

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault()
    
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
    <Button 
      variant={variant}
      onClick={toggleWishlist}
      className={cn("gap-2", className)}
    >
      <Heart className={cn("w-5 h-5 transition-all", inWishlist ? "fill-gold text-gold" : "")} />
      <span>{inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
    </Button>
  )
}
