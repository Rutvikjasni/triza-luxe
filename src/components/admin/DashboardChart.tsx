'use client'

import React, { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'


export function DashboardChart({ 
  ordersData, 
  contactsData, 
  reviewsData 
}: { 
  ordersData: any[],
  contactsData: any[],
  reviewsData: any[]
}) {
  const [filter, setFilter] = useState('6months')

  const generateData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const data = []
    
    // Default to last 6 months
    const numMonths = filter === '12months' ? 12 : filter === '3months' ? 3 : 6
    const currentDate = new Date()
    const currentMonthIndex = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()

    for (let i = numMonths - 1; i >= 0; i--) {
      let mIndex = currentMonthIndex - i
      let yIndex = currentYear
      if (mIndex < 0) {
        mIndex += 12
        yIndex -= 1
      }
      
      const filterByMonth = (items: any[]) => items.filter(item => {
        if (!item.created_at) return false
        const date = new Date(item.created_at)
        return date.getMonth() === mIndex && date.getFullYear() === yIndex
      }).length

      data.push({
        name: months[mIndex],
        orders: filterByMonth(ordersData),
        reviews: filterByMonth(reviewsData),
        contacts: filterByMonth(contactsData),
      })
    }
    return data
  }

  const chartData = generateData()

  return (
    <div className="bg-white/5 border border-gold/10 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-serif text-gold">Activity Overview</h2>
        <div className="w-40">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="w-full bg-black border border-gold/20 text-white text-sm rounded-none px-3 py-2 outline-none focus:border-gold transition-colors"
          >
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="12months">Last 12 Months</option>
          </select>
        </div>
      </div>
      
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
            <XAxis dataKey="name" stroke="#ffffff50" tick={{ fill: '#ffffff50' }} />
            <YAxis stroke="#ffffff50" tick={{ fill: '#ffffff50' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#18181b', borderColor: '#d4af3730', color: '#fff' }}
              itemStyle={{ color: '#d4af37' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="orders" name="Orders" fill="#d4af37" radius={[4, 4, 0, 0]} />
            <Bar dataKey="reviews" name="Reviews" fill="#a18837" radius={[4, 4, 0, 0]} />
            <Bar dataKey="contacts" name="Contacts" fill="#facc15" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
