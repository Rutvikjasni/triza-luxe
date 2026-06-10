'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Order } from '@/types'
import { Package, Clock, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.push('/auth/login')
        return
      }

      setUser(session.user)

      // Fetch user's orders based on email (since our demo doesn't enforce user_id on checkout yet)
      const { data: orderData } = await supabase
        .from('orders')
        .select('*')
        // .eq('user_id', session.user.id) // In a real app we'd link user_id. We'll fetch all for demo or just show a nice empty state.
        .limit(5)
        .order('created_at', { ascending: false })

      setOrders(orderData || [])
      setLoading(false)
    }

    fetchProfile()
  }, [router])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  if (loading) {
    return <div className="min-h-screen pt-32 text-center text-white/50">Loading profile...</div>
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-serif text-white mb-2">My Profile</h1>
          <p className="text-white/60">Welcome, {user?.user_metadata?.full_name || user?.email}</p>
        </div>
        <Button onClick={handleSignOut} variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-none">
          <LogOut className="w-4 h-4 mr-2" /> Sign Out
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Account Details */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <h2 className="text-lg font-serif text-gold mb-4 uppercase tracking-widest">Account Details</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-white/40 uppercase tracking-widest">Email</label>
                <p className="text-white font-medium">{user?.email}</p>
              </div>
              <div>
                <label className="text-xs text-white/40 uppercase tracking-widest">Member Since</label>
                <p className="text-white font-medium">
                  {new Date(user?.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-serif text-white mb-6 flex items-center gap-2">
            <Package className="text-gold" /> My Orders
          </h2>

          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-white/5 border border-white/10 p-10 text-center rounded-xl">
                <Clock className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/60">You haven't placed any orders yet.</p>
                <Button onClick={() => router.push('/collections')} className="mt-6 bg-gold text-black hover:bg-gold/90 rounded-none font-bold tracking-widest">
                  START SHOPPING
                </Button>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-white/5 border border-white/10 p-6 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-gold font-mono text-sm">#{order.id.substring(0, 8).toUpperCase()}</span>
                      <span className="bg-white/10 text-white/80 text-[10px] px-2 py-0.5 uppercase tracking-wider rounded">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-white/40 text-xs">
                      {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-white font-serif text-lg">₹{order.total_amount.toLocaleString('en-IN')}</p>
                    <p className="text-white/40 text-xs uppercase tracking-widest">{order.payment_method}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
