'use client'

import React, { useEffect, useState } from 'react'
import { Package, CheckCircle, Clock, XCircle, Truck } from 'lucide-react'
import Image from 'next/image'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [paymentTypeFilter, setPaymentTypeFilter] = useState('All')

  // Extract unique payment methods
  const paymentMethods = React.useMemo(() => {
    const methods = new Set<string>()
    orders.forEach(o => {
      if (o.payment_method) methods.add(o.payment_method)
    })
    return ['All', ...Array.from(methods)]
  }, [orders])

  // Filter orders
  const filteredOrders = React.useMemo(() => {
    return orders.filter(order => {
      // Search by Order ID or Product Name
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch = 
        order.id.toLowerCase().includes(searchLower) ||
        order.order_items?.some((item: any) => 
          item.product?.name?.toLowerCase().includes(searchLower)
        )

      const matchesStatus = statusFilter === 'All' || order.status === statusFilter
      const matchesPayment = paymentTypeFilter === 'All' || order.payment_method === paymentTypeFilter

      return matchesSearch && matchesStatus && matchesPayment
    })
  }, [orders, searchTerm, statusFilter, paymentTypeFilter])

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
        order.id === orderId ? { ...order, status: status } : order
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

      {/* Filters Section */}
      <div className="bg-[#111] border border-white/10 p-6 rounded-xl flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1">
          <label className="block text-xs uppercase tracking-widest text-gold mb-2">Search</label>
          <input
            type="text"
            placeholder="Search by Order ID or Product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        <div className="w-full md:w-48">
          <label className="block text-xs uppercase tracking-widest text-gold mb-2">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded focus:outline-none focus:border-gold transition-colors appearance-none"
          >
            <option value="All">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="PAID">Paid</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        <div className="w-full md:w-48">
          <label className="block text-xs uppercase tracking-widest text-gold mb-2">Payment Type</label>
          <select
            value={paymentTypeFilter}
            onChange={(e) => setPaymentTypeFilter(e.target.value)}
            className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded focus:outline-none focus:border-gold transition-colors appearance-none"
          >
            {paymentMethods.map(method => (
              <option key={method} value={method}>{method === 'All' ? 'All Types' : method}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/50 border-b border-white/10">
                <th className="p-4 text-white/60 font-medium text-sm tracking-wider uppercase">Products</th>
                <th className="p-4 text-white/60 font-medium text-sm tracking-wider uppercase">Qty</th>
                <th className="p-4 text-white/60 font-medium text-sm tracking-wider uppercase">Payment Type</th>
                <th className="p-4 text-white/60 font-medium text-sm tracking-wider uppercase">Status</th>
                <th className="p-4 text-white/60 font-medium text-sm tracking-wider uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-white/50">
                    No orders found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors align-top">
                    <td className="p-4">
                      <div className="space-y-3">
                        {order.order_items?.map((item: any, idx: number) => (
                          <div key={idx} className="flex items-center space-x-3">
                            <div className="w-10 h-10 relative bg-white/10 rounded overflow-hidden flex-shrink-0">
                              {item.product?.images?.[0] ? (
                                <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-white/20 text-[10px]">No Img</div>
                              )}
                            </div>
                            <div className="text-sm text-white line-clamp-2">
                              {item.product?.name || 'Unknown Product'}
                            </div>
                          </div>
                        ))}
                        {(!order.order_items || order.order_items.length === 0) && (
                          <div className="text-white/50 text-sm">No products found</div>
                        )}
                      </div>
                      <div className="mt-3 text-xs text-white/40">
                        Order #{order.id.substring(0, 8).toUpperCase()}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-3">
                        {order.order_items?.map((item: any, idx: number) => (
                          <div key={idx} className="h-10 flex items-center text-white/80 text-sm">
                            x{item.quantity}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="text-gold font-serif text-sm">₹{order.total_amount?.toLocaleString('en-IN') || 0}</span>
                        <span className="text-white/50 text-xs uppercase mt-1 px-2 py-1 bg-white/5 rounded w-fit">
                          {order.payment_method || 'N/A'}
                        </span>
                      </div>
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
