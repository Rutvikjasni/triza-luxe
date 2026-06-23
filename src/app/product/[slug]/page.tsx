import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ExternalLink, ShieldCheck, Truck, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'
import { ProductImageMagnifier } from '@/components/product/ProductImageMagnifier'
import { AddToCartButton } from '@/components/product/AddToCartButton'
import { AddToWishlistButton } from '@/components/product/AddToWishlistButton'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const supabase = await createClient()
  
  const { data: product } = await supabase
    .from('products')
    .select('name')
    .eq('slug', resolvedParams.slug)
    .single()

  const title = product?.name || resolvedParams.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  return {
    title: `${title} | Product Details`,
    description: `Buy ${title} from TRIZA LUXE. Premium imitation jewelry.`,
  }
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const resolvedParams = await params
  const { slug } = resolvedParams

  const supabase = await createClient()

  // Fetch product from Supabase by slug
  const { data: product } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .single()

  if (!product) {
    notFound()
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        
        {/* Product Images */}
        <div className="space-y-4">
          <ProductImageMagnifier src={product.image} alt={product.name} />
          {/* Gallery - If there were more images */}
          {product.gallery_images && product.gallery_images.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {product.gallery_images.map((img: string, idx: number) => (
                <div key={idx} className="relative aspect-square bg-white/5 border border-gold/10 cursor-pointer hover:border-gold transition-colors">
                  <Image src={img} alt={`${product.name} gallery ${idx + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <div className="mb-2">
            <Link href={`/category/${product.category?.slug || 'all'}`} className="text-gold text-sm tracking-widest uppercase hover:underline">
              {product.category?.name || 'Jewelry'}
            </Link>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif text-white mb-4 leading-tight">
            {product.name}
          </h1>
          <p className="text-2xl text-white font-light tracking-wider mb-8">
            ₹{product.price.toLocaleString('en-IN')}
          </p>
          
          <div className="w-12 h-[1px] bg-gold/50 mb-8" />

          <p className="text-white/70 leading-relaxed mb-10 font-light text-lg">
            {product.description}
          </p>

          <div className="mb-10 w-full flex flex-col sm:flex-row gap-4">
            <AddToCartButton 
              product={product} 
              className="w-full sm:flex-1 h-16 bg-gold hover:bg-gold/90 text-black font-bold tracking-widest text-lg rounded-none transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            />
            <AddToWishlistButton 
              product={product}
              className="w-full sm:w-auto h-16 px-8 border-gold/50 text-gold hover:bg-gold/10 font-bold tracking-widest rounded-none"
            />
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/10">
            <div className="flex flex-col items-center text-center space-y-3 text-white/60">
              <ShieldCheck className="w-8 h-8 text-gold" />
              <span className="text-xs tracking-widest uppercase">Premium Quality</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-3 text-white/60">
              <Truck className="w-8 h-8 text-gold" />
              <span className="text-xs tracking-widest uppercase">Fast Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-3 text-white/60">
              <RotateCcw className="w-8 h-8 text-gold" />
              <span className="text-xs tracking-widest uppercase">Easy Returns</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
