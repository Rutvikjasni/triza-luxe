'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function AddProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category_id: '',
    price: '',
    description: '',
    image: '',
    featured: false,
    trending: false,
    best_seller: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setFormData(prev => ({
      ...prev,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('products')
        .insert({
          name: formData.name,
          slug: formData.slug,
          category_id: formData.category_id,
          price: parseFloat(formData.price),
          description: formData.description,
          image: formData.image || '/placeholder-jewelry.jpg',
          gallery_images: [],
          featured: formData.featured,
          trending: formData.trending,
          best_seller: formData.best_seller,
          specifications: {}
        })

      if (error) {
        throw error
      }

      alert('Product saved successfully!')
      router.push('/admin')
      router.refresh()
    } catch (error: any) {
      console.error('Save product error:', error)
      alert(error.message || 'Failed to save product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center mb-8">
        <Link href="/admin">
          <Button variant="ghost" className="text-gold hover:bg-white/5 mr-4 px-2">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </Button>
        </Link>
        <h1 className="text-3xl font-serif text-white">Add New Product</h1>
      </div>

      <div className="bg-[#111] border border-white/10 p-8 rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/70">Product Name</label>
              <Input 
                required 
                name="name" 
                value={formData.name} 
                onChange={handleNameChange} 
                className="bg-black border-white/20 focus-visible:ring-gold rounded-none h-12 text-white" 
                placeholder="e.g. Royal Kundan Choker" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/70">Slug (URL)</label>
              <Input 
                required 
                name="slug" 
                value={formData.slug} 
                onChange={handleChange} 
                className="bg-black border-white/20 focus-visible:ring-gold rounded-none h-12 text-white/50" 
                placeholder="royal-kundan-choker" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/70">Category ID</label>
              <select 
                required 
                name="category_id" 
                value={formData.category_id} 
                onChange={handleChange} 
                className="w-full bg-black border border-white/20 focus:ring-gold rounded-none h-12 px-3 text-sm text-white/90"
              >
                <option value="">Select Category</option>
                <option value="cat-necklaces">Necklaces</option>
                <option value="cat-earrings">Earrings</option>
                <option value="cat-mangal">Mangalsutra</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/70">Price (₹)</label>
              <Input 
                required 
                type="number" 
                name="price" 
                value={formData.price} 
                onChange={handleChange} 
                className="bg-black border-white/20 focus-visible:ring-gold rounded-none h-12 text-white" 
                placeholder="0.00" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/70">Description</label>
            <textarea 
              required 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              className="w-full bg-black border border-white/20 focus:ring-1 focus:ring-gold focus:outline-none rounded-none min-h-[120px] p-4 text-sm text-white" 
              placeholder="Detailed description of the product..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/70">Image URL</label>
            <Input 
              name="image" 
              value={formData.image} 
              onChange={handleChange} 
              className="bg-black border-white/20 focus-visible:ring-gold rounded-none h-12 text-white" 
              placeholder="e.g. /products/necklace-1.png" 
            />
            <p className="text-[10px] text-white/40">Leave empty to use a placeholder image.</p>
          </div>

          <div className="flex gap-6 py-4 border-y border-white/10">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-white/80">
              <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="accent-gold w-4 h-4" />
              Featured
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm text-white/80">
              <input type="checkbox" name="trending" checked={formData.trending} onChange={handleChange} className="accent-gold w-4 h-4" />
              Trending
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm text-white/80">
              <input type="checkbox" name="best_seller" checked={formData.best_seller} onChange={handleChange} className="accent-gold w-4 h-4" />
              Best Seller
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading} className="bg-gold hover:bg-gold/90 text-black rounded-none px-8 font-bold tracking-widest">
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              {loading ? 'SAVING...' : 'SAVE PRODUCT'}
            </Button>
            <Link href="/admin">
              <Button type="button" variant="outline" className="border-white/20 text-white/80 hover:bg-white/10 rounded-none px-8 tracking-widest">
                CANCEL
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
