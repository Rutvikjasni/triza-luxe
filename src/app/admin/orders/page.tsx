'use client'

import React, { useEffect, useState } from 'react'
import { Order } from '@/types'
import { Package, Search, ChevronDown, CheckCircle, Clock, XCircle, Truck } from 'lucide-react'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders')
      const { orders, error } = await res.json()

      if (error) throw new Error(error)
      setOrders(orders || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status })
      })
      const data = await res.json()

      if (!res.ok || data.error) throw new Error(data.error || 'Failed to update')
      
      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: status as any } : order
      ))
    } catch (error) {
      console.error('Error updating order:', error)
      alert('Failed to update order status')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING': return <Clock className="w-4 h-4 text-yellow-500" />
      case 'PAID': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'SHIPPED': return <Truck className="w-4 h-4 text-blue-500" />
      case 'DELIVERED': return <Package className="w-4 h-4 text-gold" />
      case 'CANCELLED': return <XCircle className="w-4 h-4 text-red-500" />
      default: return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      case 'PAID': return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'SHIPPED': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'DELIVERED': return 'bg-gold/10 text-gold border-gold/20'
      case 'CANCELLED': return 'bg-red-500/10 text-red-500 border-red-500/20'
      default: return 'bg-white/10 text-white border-white/20'
    }
  }

  if (isLoading) {
    return <div className="p-8 text-center text-white/50">Loading orders...</div>
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-white mb-2">Orders Management</h1>
          <p className="text-white/60">View and update customer orders</p>
        </div>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/50 border-b border-white/10">
                <th className="p-4 text-white/60 font-medium text-sm tracking-wider uppercase">Order ID / Date</th>
                <th className="p-4 text-white/60 font-medium text-sm tracking-wider uppercase">Customer</th>
                <th className="p-4 text-white/60 font-medium text-sm tracking-wider uppercase">Amount</th>
                <th className="p-4 text-white/60 font-medium text-sm tracking-wider uppercase">Status</th>
                <th className="p-4 text-white/60 font-medium text-sm tracking-wider uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-white/50">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="text-white font-mono text-sm mb-1">{order.id.substring(0, 8).toUpperCase()}</div>
                      <div className="text-white/50 text-xs">
                        {new Date(order.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-white text-sm mb-1">{order.shipping_name}</div>
                      <div className="text-white/50 text-xs">{order.shipping_phone}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-gold font-serif">₹{order.total_amount.toLocaleString('en-IN')}</div>
                      <div className="text-white/40 text-[10px] uppercase mt-1">{order.payment_method}</div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="bg-black border border-white/20 text-white text-xs rounded px-2 py-1.5 outline-none focus:border-gold transition-colors"
                      >
                        <option value="PENDING">Pending</option>
                        <option value="PAID">Paid</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
