import React from 'react'
import { Metadata } from 'next'
import { ProductGridWithFilter } from '@/components/product/ProductGridWithFilter'
import { getProductsByCategory } from '@/services/productService'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug
  const title = slug.charAt(0).toUpperCase() + slug.slice(1)
  
  return {
    title: `${title} Collection`,
    description: `Explore our premium collection of ${title} imitation jewelry.`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params
  const slug = resolvedParams.slug
  const products = await getProductsByCategory(slug)

  const title = slug.charAt(0).toUpperCase() + slug.slice(1)

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
          <span className="text-gold italic">{title}</span> Collection
        </h1>
        <p className="text-white/60 max-w-2xl mx-auto">
          Discover our exquisite {title} pieces crafted for true elegance.
        </p>
      </div>

      <ProductGridWithFilter products={products} />
    </div>
  )
}
