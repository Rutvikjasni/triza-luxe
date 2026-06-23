'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen flex items-center justify-center relative z-10">
      <div className="w-full max-w-md p-8 bg-black/60 border border-gold/20 backdrop-blur-md rounded-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-white mb-2 uppercase tracking-widest">Sign In</h1>
          <p className="text-white/60 text-sm tracking-wider">Welcome back to Triza Luxe</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-sm text-center rounded">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/70">Email Address</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/5 border-white/10 focus-visible:ring-gold focus-visible:border-gold rounded-none h-12 text-white transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-xs uppercase tracking-widest text-white/70">Password</label>
              <Link href="#" className="text-xs text-gold hover:underline">Forgot?</Link>
            </div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/5 border-white/10 focus-visible:ring-gold focus-visible:border-gold rounded-none h-12 text-white transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 bg-gold hover:bg-gold/90 text-black font-bold tracking-widest rounded-none mt-4 transition-all"
          >
            {loading ? 'SIGNING IN...' : 'SIGN IN'}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-white/60">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-gold hover:underline font-medium">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  )
}
