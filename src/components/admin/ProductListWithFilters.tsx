'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Eye, Edit, Filter } from 'lucide-react'
import { DeleteProductButton } from '@/components/admin/DeleteProductButton'

interface Product {
  id: string
  name: string
  price: number
  slug: string
  images: string[]
  category?: { name: string }
}

interface ProductListWithFiltersProps {
  products: Product[]
}

export function ProductListWithFilters({ products }: ProductListWithFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [maxPrice, setMaxPrice] = useState<number>(0)
  
  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>()
    products.forEach(p => {
      if (p.category?.name) cats.add(p.category.name)
    })
    return ['All', ...Array.from(cats)]
  }, [products])

  // Get max price from products
  const highestPrice = useMemo(() => {
    if (products.length === 0) return 0
    return Math.max(...products.map(p => p.price || 0))
  }, [products])

  // Initialize maxPrice
  React.useEffect(() => {
    if (highestPrice > 0 && maxPrice === 0) {
      setMaxPrice(highestPrice)
    }
  }, [highestPrice])

  // Apply filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === 'All' || product.category?.name === categoryFilter
      const matchesPrice = (product.price || 0) <= (maxPrice === 0 ? highestPrice : maxPrice)

      return matchesSearch && matchesCategory && matchesPrice
    })
  }, [products, searchTerm, categoryFilter, maxPrice, highestPrice])

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="bg-white/5 border border-gold/10 p-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1 relative">
          <label className="block text-xs uppercase tracking-widest text-gold mb-2">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/50 border border-gold/20 text-white pl-10 pr-4 py-2 rounded-none focus:outline-none focus:border-gold transition-colors"
            />
          </div>
        </div>

        <div className="w-full md:w-48">
          <label className="block text-xs uppercase tracking-widest text-gold mb-2">Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full bg-black/50 border border-gold/20 text-white px-4 py-2 rounded-none focus:outline-none focus:border-gold transition-colors appearance-none"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-64">
          <label className="block text-xs uppercase tracking-widest text-gold mb-2">
            Max Price: ₹{maxPrice === 0 ? highestPrice.toLocaleString('en-IN') : maxPrice.toLocaleString('en-IN')}
          </label>
          <input
            type="range"
            min="0"
            max={highestPrice || 1000}
            step="100"
            value={maxPrice === 0 ? highestPrice : maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full mt-2 accent-gold"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white/5 border border-gold/10 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white/70">
            <thead className="bg-black/50 text-xs uppercase tracking-widest text-gold border-b border-gold/20">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 relative bg-white/10 rounded-sm overflow-hidden">
                      {product.images?.[0] ? (
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/20">N/A</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-white">{product.name}</td>
                  <td className="px-6 py-4">{product.category?.name || 'Uncategorized'}</td>
                  <td className="px-6 py-4">₹{product.price?.toLocaleString('en-IN') || '0'}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-4 items-center justify-end">
                      <Link href={`/product/${product.slug}`} target="_blank" className="text-gray-400 hover:text-white transition-colors cursor-pointer" title="View Product">
                        <Eye size={18} />
                      </Link>
                      <Link href={`/admin/products/${product.id}/edit`} className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer" title="Edit Product">
                        <Edit size={18} />
                      </Link>
                      <DeleteProductButton id={product.id} />
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-white/50">
                    No products found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
