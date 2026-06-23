'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (mobile.length < 10) {
      setError("Please enter a valid mobile number")
      setLoading(false)
      return
    }

    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          middle_name: middleName,
          last_name: lastName,
          mobile_number: mobile,
          full_name: `${firstName} ${lastName}`.trim(),
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/70">First Name *</label>
                <Input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="bg-white/5 border-white/10 focus-visible:ring-gold focus-visible:border-gold rounded-none h-12 text-white transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/70">Middle Name</label>
                <Input
                  type="text"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  className="bg-white/5 border-white/10 focus-visible:ring-gold focus-visible:border-gold rounded-none h-12 text-white transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/70">Last Name *</label>
                <Input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="bg-white/5 border-white/10 focus-visible:ring-gold focus-visible:border-gold rounded-none h-12 text-white transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/70">Mobile Number *</label>
                <Input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                  className="bg-white/5 border-white/10 focus-visible:ring-gold focus-visible:border-gold rounded-none h-12 text-white transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/70">Email Address *</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border-white/10 focus-visible:ring-gold focus-visible:border-gold rounded-none h-12 text-white transition-colors"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/70">Password *</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
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
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/70">Confirm Password *</label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="bg-white/5 border-white/10 focus-visible:ring-gold focus-visible:border-gold rounded-none h-12 text-white transition-colors pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
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
