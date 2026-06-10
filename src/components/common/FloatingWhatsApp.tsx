'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function FloatingWhatsApp() {
  const whatsappNumber = '919876543210' // Replace with actual number
  const message = 'Hello Triza Luxe, I would like to inquire about your jewelry collection.'
  const pathname = usePathname()

  if (pathname.startsWith('/admin')) return null

  return (
    <motion.a
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 20 }}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-[#25D366]/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} className="group-hover:scale-110 transition-transform duration-300" />
      <span className="absolute -top-10 right-0 bg-white text-black text-xs font-bold px-3 py-1.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat with us
      </span>
    </motion.a>
  )
}
