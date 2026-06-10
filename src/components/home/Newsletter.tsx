'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setEmail('')
    }, 1500)
  }

  return (
    <section className="py-24 bg-transparent border-t border-gold/10 relative z-10">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-3xl -z-10" />
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">
            Join the <span className="text-gold italic">Inner Circle</span>
          </h2>
          <p className="text-white/60 mb-10 text-lg font-light">
            Subscribe to receive exclusive access to new arrivals, private sales, and behind-the-scenes content.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-xl mx-auto gap-4">
            <Input
              type="email"
              placeholder="Enter your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-gold/30 text-white placeholder:text-white/30 h-14 rounded-none focus-visible:ring-gold"
            />
            <Button 
              type="submit" 
              disabled={status === 'loading'}
              className="h-14 bg-gold hover:bg-gold/90 text-black font-bold tracking-widest px-8 rounded-none w-full sm:w-auto"
            >
              {status === 'loading' ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
            </Button>
          </form>

          {status === 'success' && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gold mt-6 tracking-wider text-sm"
            >
              Thank you for subscribing to Triza Luxe.
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
