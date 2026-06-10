import React from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Package, FolderTree, Users, Mail, Plus, Edit, Trash2, ShoppingCart } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  // const { data: { session }, error } = await supabase.auth.getSession()

  // if (error || !session) {
  //   redirect('/admin/login')
  // }

  // Dashboard Stats (Mocked for UI purposes)
  const stats = [
    { name: 'Total Products', value: '124', icon: Package },
    { name: 'Categories', value: '8', icon: FolderTree },
    { name: 'Orders', value: '45', icon: ShoppingCart },
    { name: 'Subscribers', value: '2.4k', icon: Mail },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-serif text-white">Dashboard</h1>
        <form action="/auth/signout" method="post">
          <Button variant="outline" className="border-gold/50 text-gold hover:bg-gold/10 rounded-none">
            Sign Out
          </Button>
        </form>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white/5 border border-gold/10 p-6 flex items-center space-x-4">
            <div className="p-3 bg-gold/10 rounded-full text-gold">
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-white/50 text-xs uppercase tracking-widest">{stat.name}</p>
              <p className="text-2xl font-serif text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white/5 border border-gold/10 p-6 mb-12">
        <h2 className="text-xl font-serif text-gold mb-6">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/admin/products/new">
            <Button className="bg-gold hover:bg-gold/90 text-black rounded-none">
              <Plus className="mr-2 w-4 h-4" /> Add Product
            </Button>
          </Link>
          <Link href="/admin/categories/new">
            <Button variant="outline" className="border-gold/50 text-gold hover:bg-gold/10 rounded-none">
              <Plus className="mr-2 w-4 h-4" /> Add Category
            </Button>
          </Link>
          <Link href="/admin/orders">
            <Button variant="outline" className="border-gold/50 text-gold hover:bg-gold/10 rounded-none">
              <ShoppingCart className="mr-2 w-4 h-4" /> View Orders
            </Button>
          </Link>
          <Button variant="outline" className="border-gold/50 text-gold hover:bg-gold/10 rounded-none">
            Manage Testimonials
          </Button>
        </div>
      </div>

      {/* Recent Products Table Outline */}
      <div className="bg-white/5 border border-gold/10 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-serif text-gold">Recent Products</h2>
          <Button variant="link" className="text-gold hover:text-white">View All</Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white/70">
            <thead className="bg-black/50 text-xs uppercase tracking-widest text-gold border-b border-gold/20">
              <tr>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Mock Row */}
              <tr className="border-b border-white/5 hover:bg-white/5">
                <td className="px-6 py-4 font-medium text-white">Royal Kundan Choker Set</td>
                <td className="px-6 py-4">Necklaces</td>
                <td className="px-6 py-4">₹4,999</td>
                <td className="px-6 py-4 flex space-x-3">
                  <button className="text-blue-400 hover:text-blue-300"><Edit size={18} /></button>
                  <button className="text-red-400 hover:text-red-300"><Trash2 size={18} /></button>
                </td>
              </tr>
              {/* Add more dynamic rows here based on Supabase fetch */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
