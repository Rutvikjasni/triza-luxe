'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag, Search, User, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useCart } from '@/store/CartContext'
import { createClient } from '@/lib/supabase/client'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Collections', href: '/collections' },
  { name: 'Mangalsutra', href: '/category/mangalsutra' },
  { name: 'Necklaces', href: '/category/necklaces' },
  { name: 'Earrings', href: '/category/earrings' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { totalItems, setIsCartOpen } = useCart()

  const [user, setUser] = useState<any>(null)

  if (pathname.startsWith('/admin')) return null

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)

    // Check user session
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 md:px-12 py-4',
        isScrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-gold/20 py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white hover:text-gold transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link href="/" className="flex flex-col items-center group">
          <span className="text-2xl md:text-3xl font-serif tracking-[0.2em] text-white group-hover:text-gold transition-colors duration-300 uppercase">
            Triza Luxe
          </span>
          <span className="text-[10px] tracking-[0.4em] text-gold uppercase mt-0.5">
            Imitation Jewelry
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm uppercase tracking-widest transition-all duration-300 hover:text-gold relative group',
                pathname === link.href ? 'text-gold' : 'text-white/80'
              )}
            >
              {link.name}
              <span
                className={cn(
                  'absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full',
                  pathname === link.href ? 'w-full' : ''
                )}
              />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-5">
          <button className="text-white/80 hover:text-gold transition-colors">
            <Search size={20} />
          </button>
          
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-[10px] uppercase tracking-widest text-gold hover:text-white transition-colors border border-gold/30 px-3 py-1 rounded-full">
                Admin
              </Link>
              <button onClick={handleLogout} className="text-white/80 hover:text-red-400 transition-colors" title="Logout">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link href="/auth/login" className="text-white/80 hover:text-gold transition-colors" title="Sign In">
              <User size={20} />
            </Link>
          )}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="text-white/80 hover:text-gold transition-colors relative"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-[400px] bg-black border-r border-gold/20 z-[70] p-10 flex flex-col"
            >
              <div className="flex justify-between items-center mb-16">
                <span className="text-xl font-serif tracking-widest text-gold uppercase">
                  Menu
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-gold"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col space-y-8">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'text-2xl font-serif tracking-widest hover:text-gold transition-colors',
                        pathname === link.href ? 'text-gold' : 'text-white'
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto">
                <Button className="w-full bg-gold hover:bg-gold/80 text-black font-bold tracking-widest py-6">
                  SHOP ALL
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
