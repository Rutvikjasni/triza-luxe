'use client'

import React, { useState, useMemo } from 'react'
import { ProductCard } from '@/components/product/ProductCard'
import { Filter } from 'lucide-react'

// Assuming Product type has a price property
interface Product {
  id: string
  name: string
  price: number
  [key: string]: any
}

interface ProductGridWithFilterProps {
  products: Product[]
}

export function ProductGridWithFilter({ products }: ProductGridWithFilterProps) {
  const [maxPrice, setMaxPrice] = useState<number>(10000)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Find max price in the actual products list to set a proper max for the slider
  const highestPrice = useMemo(() => {
    if (products.length === 0) return 10000
    return Math.max(...products.map(p => p.price))
  }, [products])

  // Initialize maxPrice if highestPrice changes
  React.useEffect(() => {
    setMaxPrice(highestPrice)
  }, [highestPrice])

  const filteredProducts = useMemo(() => {
    return products.filter(p => p.price <= maxPrice)
  }, [products, maxPrice])

  if (products.length === 0) {
    return (
      <div className="text-center text-white/50 py-20">
        No products found.
      </div>
    )
  }

  return (
    <div>
      {/* Filter Controls */}
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gold/20 pb-4">
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 text-gold hover:text-white transition-colors"
        >
          <Filter size={20} />
          <span className="uppercase tracking-widest text-sm font-bold">Filter by Price</span>
        </button>
        
        <div className="text-white/60 text-sm">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

      {isFilterOpen && (
        <div className="mb-8 p-6 border border-gold/20 bg-black/50 rounded-lg max-w-md animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex justify-between text-sm mb-4">
            <span className="text-white/60">₹0</span>
            <span className="text-gold font-bold">Up to ₹{maxPrice.toLocaleString('en-IN')}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max={highestPrice} 
            step="100"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-gold cursor-pointer"
          />
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center text-white/50 py-20">
          No products found in this price range.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product as any} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}
