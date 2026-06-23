'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

export function AboutUsForm({ initialData }: { initialData: any }) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    intro_text: initialData?.intro_text || '',
    design_philosophy: initialData?.design_philosophy || '',
    womens_empowerment: initialData?.womens_empowerment || '',
    collection_house: initialData?.collection_house || '',
    celebrity_favorites: initialData?.celebrity_favorites || '',
    national_reach: initialData?.national_reach || '',
    founder_name: initialData?.founder_name || '',
    team_size: initialData?.team_size || '',
    industry: initialData?.industry || '',
    orders_text: initialData?.orders_text || '',
    quote_text: initialData?.quote_text || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { error } = await supabase
        .from('about_us')
        .update(formData)
        .eq('id', '11111111-1111-1111-1111-111111111111')

      if (error) throw error

      setMessage('About Us page updated successfully!')
      router.refresh()
    } catch (err: any) {
      console.error(err)
      setMessage(err.message || 'Error updating content')
    } finally {
      setLoading(false)
    }
  }

  const renderField = (name: string, label: string, isTextarea = true) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gold mb-2">{label}</label>
      {isTextarea ? (
        <textarea
          name={name}
          value={(formData as any)[name]}
          onChange={handleChange}
          rows={4}
          className="w-full bg-white/5 border border-gold/20 p-3 text-white focus:outline-none focus:border-gold/50 rounded-none"
        />
      ) : (
        <input
          type="text"
          name={name}
          value={(formData as any)[name]}
          onChange={handleChange}
          className="w-full bg-white/5 border border-gold/20 p-3 text-white focus:outline-none focus:border-gold/50 rounded-none"
        />
      )}
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 border border-gold/10 p-6 md:p-8">
      {message && (
        <div className={`mb-6 p-4 border ${message.includes('Error') ? 'border-red-500/50 bg-red-500/10 text-red-400' : 'border-green-500/50 bg-green-500/10 text-green-400'}`}>
          {message}
        </div>
      )}

      <h2 className="text-xl font-serif text-gold mb-6">Main Content</h2>
      {renderField('intro_text', 'Introduction Text')}
      {renderField('design_philosophy', 'Design Philosophy')}
      {renderField('womens_empowerment', 'Women\'s Empowerment')}
      {renderField('collection_house', 'Collection House')}
      {renderField('celebrity_favorites', 'Celebrity Favorites')}
      {renderField('national_reach', 'National Reach')}

      <h2 className="text-xl font-serif text-gold mb-6 mt-10">Company Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderField('founder_name', 'Founder Name', false)}
        {renderField('team_size', 'Team Size', false)}
        {renderField('industry', 'Industry', false)}
        {renderField('orders_text', 'Orders Text', false)}
      </div>

      <h2 className="text-xl font-serif text-gold mb-6 mt-10">Quote</h2>
      {renderField('quote_text', 'Footer Quote')}

      <div className="mt-8">
        <Button type="submit" disabled={loading} className="bg-gold hover:bg-gold/90 text-black px-8 rounded-none">
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  )
}
