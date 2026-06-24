import React from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { ProductListWithFilters } from '@/components/admin/ProductListWithFilters'

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

      <ProductListWithFilters products={products || []} />
    </div>
  )
}
