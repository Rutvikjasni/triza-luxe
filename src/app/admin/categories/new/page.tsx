import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Save } from 'lucide-react'

export default function AddCategoryPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center mb-8">
        <Link href="/admin">
          <Button variant="ghost" className="text-gold hover:bg-white/5 mr-4 px-2">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </Button>
        </Link>
        <h1 className="text-3xl font-serif text-white">Add New Category</h1>
      </div>

      <div className="bg-white/5 border border-gold/10 p-8">
        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/70">Category Name</label>
            <Input className="bg-black border-gold/20 focus-visible:ring-gold rounded-none h-12" placeholder="e.g. Bracelets" />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/70">URL Slug</label>
            <Input className="bg-black border-gold/20 focus-visible:ring-gold rounded-none h-12 text-white/50" placeholder="e.g. bracelets" />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/70">Category Cover Image</label>
            <div className="border-2 border-dashed border-gold/20 p-8 text-center bg-black/50 hover:bg-white/5 transition-colors cursor-pointer">
              <p className="text-white/50 text-sm">Click to upload or drag and drop image here</p>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-white/10">
            <Button type="button" className="bg-gold hover:bg-gold/90 text-black rounded-none px-8">
              <Save className="w-4 h-4 mr-2" /> Save Category
            </Button>
            <Link href="/admin">
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
