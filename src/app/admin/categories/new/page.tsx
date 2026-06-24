'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Save } from 'lucide-react'

export default function AddCategoryPage() {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const generateSlug = (val: string) => {
    return val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setName(newName)
    setSlug(generateSlug(newName))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!name || !slug) {
      setError('Name and slug are required')
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { error: insertError } = await supabase
        .from('categories')
        .insert([{ name, slug }])

      if (insertError) throw insertError

      router.push('/admin/categories')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Failed to add category')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center mb-8">
        <Link href="/admin/categories">
          <Button variant="ghost" className="text-gold hover:bg-white/5 mr-4 px-2">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </Button>
        </Link>
        <h1 className="text-3xl font-serif text-white">Add New Category</h1>
      </div>

      <div className="bg-white/5 border border-gold/10 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/70">Category Name</label>
            <Input 
              value={name}
              onChange={handleNameChange}
              className="bg-black border-gold/20 focus-visible:ring-gold rounded-none h-12 text-white" 
              placeholder="e.g. Bracelets" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/70">URL Slug</label>
            <Input 
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="bg-black border-gold/20 focus-visible:ring-gold rounded-none h-12 text-white/50" 
              placeholder="e.g. bracelets" 
            />
          </div>

          <div className="flex gap-4 pt-4 border-t border-white/10">
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-gold hover:bg-gold/90 text-black rounded-none px-8 disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" /> {loading ? 'Saving...' : 'Save Category'}
            </Button>
            <Link href="/admin/categories">
              <Button type="button" variant="outline" className="border-gold/50 text-gold hover:bg-gold/10 rounded-none px-8">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
