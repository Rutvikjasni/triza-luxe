'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export function DeleteProductButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) return

    setIsDeleting(true)
    const supabase = createClient()
    
    const { error } = await supabase.from('products').delete().eq('id', id)
    
    setIsDeleting(false)
    
    if (error) {
      console.error('Error deleting product:', error)
      alert('Failed to delete product.')
    } else {
      router.refresh()
    }
  }

  return (
    <button 
      onClick={handleDelete} 
      disabled={isDeleting}
      className={`text-red-400 hover:text-red-300 transition-colors cursor-pointer ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
      title="Delete Product"
    >
      <Trash2 size={18} />
    </button>
  )
}
