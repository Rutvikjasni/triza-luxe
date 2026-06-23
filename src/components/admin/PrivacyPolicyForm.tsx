'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

export function PrivacyPolicyForm({ initialData }: { initialData: any }) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [content, setContent] = useState(initialData?.content || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { error } = await supabase
        .from('privacy_policy')
        .update({ content })
        .eq('id', '22222222-2222-2222-2222-222222222222')

      if (error) throw error

      setMessage('Privacy Policy updated successfully!')
      router.refresh()
    } catch (err: any) {
      console.error(err)
      setMessage(err.message || 'Error updating content')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 border border-gold/10 p-6 md:p-8">
      {message && (
        <div className={`mb-6 p-4 border ${message.includes('Error') ? 'border-red-500/50 bg-red-500/10 text-red-400' : 'border-green-500/50 bg-green-500/10 text-green-400'}`}>
          {message}
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium text-gold mb-2">Privacy Policy Content (Markdown supported)</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={20}
          className="w-full bg-white/5 border border-gold/20 p-4 text-white focus:outline-none focus:border-gold/50 rounded-none font-mono text-sm leading-relaxed"
          placeholder="Enter privacy policy text here..."
        />
      </div>

      <div className="mt-8">
        <Button type="submit" disabled={loading} className="bg-gold hover:bg-gold/90 text-black px-8 rounded-none">
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  )
}
