import React from 'react'
import { Metadata } from 'next'
import { ProductCard } from '@/components/product/ProductCard'
import { getFeaturedProducts, getBestSellers, getTrendingProducts } from '@/services/productService'

export const metadata: Metadata = {
  title: 'All Collections',
  description: 'Explore our complete collection of premium imitation jewelry.',
}

export default async function CollectionsPage() {
  // In a real scenario, this would be a paginated query for all products.
  // For the demo, we'll combine the mock queries.
  const featured = await getFeaturedProducts()
  const bestSellers = await getBestSellers()
  const trending = await getTrendingProducts()
  
  // Deduplicate products based on ID
  const allProductsMap = new Map()
  ;[...featured, ...bestSellers, ...trending].forEach(p => {
    allProductsMap.set(p.id, p)
  })
  
  const products = Array.from(allProductsMap.values())

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
          All <span className="text-gold italic">Collections</span>
        </h1>
        <p className="text-white/60 max-w-2xl mx-auto">
          Discover our curated selection of necklaces, earrings, rings, and more. Each piece is crafted to perfection, ensuring you always shine.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center text-white/50 py-20">
          No products found in the collection.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}
