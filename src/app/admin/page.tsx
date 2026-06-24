import React from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Package, FolderTree, Users, ShoppingCart } from 'lucide-react'
import { DashboardChart } from '@/components/admin/DashboardChart'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch dynamic counts and data
  const [
    { count: productsCount },
    { count: categoriesCount },
    { data: ordersData },
    { data: contactsData },
    { data: reviewsData },
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('id, created_at, total_amount'),
    supabase.from('newsletter_subscribers').select('id, created_at'), // using subscribers as proxy for contacts if contact table isn't present
    supabase.from('reviews').select('id, created_at') // Mock reviews if table doesn't exist
  ])

  // Dashboard Stats
  const stats = [
    { name: 'Total Products', value: productsCount?.toString() || '0', icon: Package },
    { name: 'Categories', value: categoriesCount?.toString() || '0', icon: FolderTree },
    { name: 'Total Orders', value: ordersData?.length?.toString() || '0', icon: ShoppingCart },
    { name: 'Total Revenue', value: `₹${ordersData?.reduce((sum, order) => sum + (order.total_amount || 0), 0).toLocaleString('en-IN') || '0'}`, icon: Users },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-serif text-white">Dashboard Overview</h1>
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

      {/* Analytics Chart */}
      <DashboardChart 
        ordersData={ordersData || []} 
        contactsData={contactsData || []} 
        reviewsData={reviewsData || []} 
      />
    </div>
  )
}
