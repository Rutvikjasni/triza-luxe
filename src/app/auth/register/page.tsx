'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        }
      }
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen flex items-center justify-center relative z-10">
      <div className="w-full max-w-md p-8 bg-black/60 border border-gold/20 backdrop-blur-md rounded-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-white mb-2 uppercase tracking-widest">Register</h1>
          <p className="text-white/60 text-sm tracking-wider">Join Triza Luxe today</p>
        </div>

        {success ? (
          <div className="text-center space-y-6">
            <div className="p-4 bg-green-500/10 border border-green-500/50 text-green-500 rounded">
              Registration successful! You can now sign in.
            </div>
            <Link href="/auth/login" className="block">
              <Button className="w-full h-12 bg-gold hover:bg-gold/90 text-black font-bold tracking-widest rounded-none">
                GO TO LOGIN
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-sm text-center rounded">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/70">Full Name</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-white/5 border-white/10 focus-visible:ring-gold focus-visible:border-gold rounded-none h-12 text-white transition-colors"
              />
            </div>

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
              <label className="text-xs uppercase tracking-widest text-white/70">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="bg-white/5 border-white/10 focus-visible:ring-gold focus-visible:border-gold rounded-none h-12 text-white transition-colors"
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 bg-gold hover:bg-gold/90 text-black font-bold tracking-widest rounded-none mt-2 transition-all"
            >
              {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </Button>
          </form>
        )}

        {!success && (
          <div className="mt-8 text-center text-sm text-white/60">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-gold hover:underline font-medium">
              Sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
