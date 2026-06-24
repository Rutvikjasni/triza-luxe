import React from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Plus, Eye, Edit } from 'lucide-react'
import { DeleteProductButton } from '@/components/admin/DeleteProductButton'
import Image from 'next/image'

export default async function AdminProductsPage() {
  const supabase = await createClient()

  const { data: products, error } = await supabase
    .from('products')
    .select('*, category:categories(name)')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-serif text-white">Products</h1>
          <p className="text-white/50 mt-2">Manage your catalog, add new items, and edit existing ones.</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-gold hover:bg-gold/90 text-black rounded-none px-6">
            <Plus className="mr-2 w-4 h-4" /> Add Product
          </Button>
        </Link>
      </div>

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
              {products?.map((product) => (
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
              {(!products || products.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-white/50">
                    No products found. Start by adding one.
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
