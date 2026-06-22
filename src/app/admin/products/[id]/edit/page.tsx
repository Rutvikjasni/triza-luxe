'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Save, Loader2, CheckCircle2, XCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params?.id as string

  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [toast, setToast] = useState<{show: boolean, message: string, type: 'success' | 'error'}>({ show: false, message: '', type: 'success' })
  const [imageFile, setImageFile] = useState<File | null>(null)
  
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
  const [categories, setCategories] = useState<{id: string, name: string}[]>([])

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()
      
      // Fetch categories
      const { data: catData } = await supabase.from('categories').select('id, name')
      if (catData) setCategories(catData)

      // Fetch product data
      if (productId) {
        const { data: prodData, error } = await supabase.from('products').select('*').eq('id', productId).single()
        if (prodData) {
          setFormData({
            name: prodData.name,
            slug: prodData.slug,
            category_id: prodData.category_id || '',
            price: prodData.price.toString(),
            description: prodData.description || '',
            image: prodData.image || '',
            featured: prodData.featured || false,
            trending: prodData.trending || false,
            best_seller: prodData.best_seller || false
          })
        } else if (error) {
          showToast('Failed to load product data', 'error')
        }
      }
      setFetching(false)
    }
    fetchData()
  }, [productId])

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

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ show: true, message, type })
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }))
    }, 3000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = createClient()
      let imageUrl = formData.image

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        
        const { error: uploadError } = await supabase.storage
          .from('products')
          .upload(fileName, imageFile)

        if (uploadError) throw new Error('Image upload failed: ' + uploadError.message)

        const { data: { publicUrl } } = supabase.storage
          .from('products')
          .getPublicUrl(fileName)
          
        imageUrl = publicUrl
      }

      const { error } = await supabase
        .from('products')
        .update({
          name: formData.name,
          slug: formData.slug,
          category_id: formData.category_id,
          price: parseFloat(formData.price),
          description: formData.description,
          image: imageUrl,
          featured: formData.featured,
          trending: formData.trending,
          best_seller: formData.best_seller,
        })
        .eq('id', productId)

      if (error) throw error

      showToast('Product updated successfully!', 'success')
      setTimeout(() => {
        router.push('/admin')
        router.refresh()
      }, 1500)
    } catch (error: any) {
      console.error('Update product error:', error)
      showToast(error.message || 'Failed to update product', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) return <div className="text-white text-center py-20"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" /> Loading product...</div>

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 relative">
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-xl backdrop-blur-md border shadow-2xl ${
              toast.type === 'success' 
                ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            <span className="font-medium tracking-wide">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center mb-8">
        <Link href="/admin">
          <Button variant="ghost" className="text-gold hover:bg-white/5 mr-4 px-2">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </Button>
        </Link>
        <h1 className="text-3xl font-serif text-white">Edit Product</h1>
      </div>

      <div className="bg-[#111] border border-white/10 p-8 rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/70">Product Name</label>
              <Input required name="name" value={formData.name} onChange={handleNameChange} className="bg-black border-white/20 focus-visible:ring-gold rounded-none h-12 text-white" />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/70">Slug (URL)</label>
              <Input required name="slug" value={formData.slug} onChange={handleChange} className="bg-black border-white/20 focus-visible:ring-gold rounded-none h-12 text-white/50" />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/70">Category ID</label>
              <select required name="category_id" value={formData.category_id} onChange={handleChange} className="w-full bg-black border border-white/20 focus:ring-gold rounded-none h-12 px-3 text-sm text-white/90">
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/70">Price (₹)</label>
              <Input required type="number" name="price" value={formData.price} onChange={handleChange} className="bg-black border-white/20 focus-visible:ring-gold rounded-none h-12 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/70">Description</label>
            <textarea required name="description" value={formData.description} onChange={handleChange} className="w-full bg-black border border-white/20 focus:ring-1 focus:ring-gold focus:outline-none rounded-none min-h-[120px] p-4 text-sm text-white" />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/70">Product Image (Upload New)</label>
            <Input type="file" accept="image/*" onChange={(e) => { if (e.target.files && e.target.files[0]) setImageFile(e.target.files[0]) }} className="bg-black border-white/20 focus-visible:ring-gold rounded-none h-12 text-white/70 file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xs file:font-semibold file:bg-gold file:text-black hover:file:bg-gold/90 cursor-pointer pt-2" />
            <p className="text-[10px] text-white/40">Leave empty to keep the current image.</p>
            {formData.image && <img src={formData.image} alt="Current" className="h-20 w-20 object-cover mt-2 border border-white/20" />}
          </div>

          <div className="flex gap-6 py-4 border-y border-white/10">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-white/80">
              <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="accent-gold w-4 h-4" /> Featured
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm text-white/80">
              <input type="checkbox" name="trending" checked={formData.trending} onChange={handleChange} className="accent-gold w-4 h-4" /> Trending
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm text-white/80">
              <input type="checkbox" name="best_seller" checked={formData.best_seller} onChange={handleChange} className="accent-gold w-4 h-4" /> Best Seller
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading} className="bg-gold hover:bg-gold/90 text-black rounded-none px-8 font-bold tracking-widest">
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              {loading ? 'UPDATING...' : 'UPDATE PRODUCT'}
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
