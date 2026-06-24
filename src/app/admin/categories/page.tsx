import React from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default async function AdminCategoriesPage() {
  const supabase = await createClient()

  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-serif text-white">Categories</h1>
          <p className="text-white/50 mt-2">Manage your product categories.</p>
        </div>
        <Link href="/admin/categories/new">
          <Button className="bg-gold hover:bg-gold/90 text-black rounded-none px-6">
            <Plus className="mr-2 w-4 h-4" /> Add Category
          </Button>
        </Link>
      </div>

      <div className="bg-white/5 border border-gold/10 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white/70">
            <thead className="bg-black/50 text-xs uppercase tracking-widest text-gold border-b border-gold/20">
              <tr>
                <th className="px-6 py-4">Category Name</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Created Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category) => (
                <tr key={category.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-6 py-4 font-medium text-white">{category.name}</td>
                  <td className="px-6 py-4 text-white/50">{category.slug}</td>
                  <td className="px-6 py-4 text-white/50">
                    {new Date(category.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-4 items-center justify-end">
                      <Link href={`/admin/categories/${category.id}/edit`} className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer" title="Edit Category">
                        <Edit size={18} />
                      </Link>
                      <button className="text-red-400 hover:text-red-300 transition-colors" title="Delete Category">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {(!categories || categories.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-white/50">
                    No categories found. Start by adding one.
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
