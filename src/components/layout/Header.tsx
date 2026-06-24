'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag, Search, User, LogOut, ChevronDown, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useCart } from '@/store/CartContext'
import { useWishlist } from '@/store/WishlistContext'
import { createClient } from '@/lib/supabase/client'

type NavLink = {
  name: string;
  href?: string;
  dropdown?: { name: string; href: string }[];
};

const navLinks: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'Collections', href: '/collections' },
  { name: 'Mangalsutra', href: '/category/mangalsutra' },
  { name: 'Necklaces', href: '/category/necklaces' },
  { 
    name: 'More', 
    dropdown: [
      { name: 'About', href: '/about' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Contact', href: '/contact' },
    ]
  }
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false)
  const pathname = usePathname()
  const { totalItems, setIsCartOpen } = useCart()
  const { totalItems: wishlistTotal } = useWishlist()

  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

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
      document.removeEventListener('click', handleClickOutside)
      subscription.unsubscribe()
    }
  }, [])

  if (pathname.startsWith('/admin')) return null

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
  }

  const getInitials = () => {
    if (!user) return ''
    
    const firstName = user.user_metadata?.first_name
    const lastName = user.user_metadata?.last_name
    
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
    }
    
    const fullName = user.user_metadata?.full_name
    if (fullName) {
      const parts = fullName.split(' ')
      if (parts.length >= 2) {
        return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase()
      }
      return fullName.charAt(0).toUpperCase()
    }
    
    if (user.email) {
      return user.email.charAt(0).toUpperCase()
    }
    
    return 'U'
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
            link.dropdown ? (
              <div key={link.name} className="relative dropdown-container">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={cn(
                    'text-sm uppercase tracking-widest transition-all duration-300 hover:text-gold flex items-center gap-1',
                    isDropdownOpen ? 'text-gold' : 'text-white/80'
                  )}
                >
                  {link.name}
                  <ChevronDown
                    size={14}
                    className={cn(
                      'transition-transform duration-300',
                      isDropdownOpen ? 'rotate-180' : ''
                    )}
                  />
                </button>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-4 w-48 bg-black/95 backdrop-blur-md border border-gold/20 flex flex-col py-2 z-50 shadow-xl"
                    >
                      {link.dropdown.map((dropLink) => (
                        <Link
                          key={dropLink.href}
                          href={dropLink.href}
                          onClick={() => setIsDropdownOpen(false)}
                          className={cn(
                            'px-4 py-3 text-xs uppercase tracking-widest hover:text-gold transition-colors hover:bg-white/5',
                            pathname === dropLink.href ? 'text-gold bg-white/5' : 'text-white/80'
                          )}
                        >
                          {dropLink.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.name}
                href={link.href!}
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
            )
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-5">
          <button className="text-white/80 hover:text-gold transition-colors">
            <Search size={20} />
          </button>
          
          {user ? (
            <div className="flex items-center gap-4">
              {user.email === 'admin@trizaluxe.com' && (
                <Link href="/admin" className="text-[10px] uppercase tracking-widest text-gold hover:text-white transition-colors border border-gold/30 px-3 py-1 rounded-full hidden md:block">
                  Admin
                </Link>
              )}
              <div className="flex items-center gap-3">
                <Link 
                  href="/profile" 
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-gold text-black font-bold text-xs hover:bg-white transition-colors shadow-[0_0_10px_rgba(212,175,55,0.3)]"
                  title="Profile"
                >
                  {getInitials()}
                </Link>
                <button onClick={handleLogout} className="text-white/80 hover:text-red-400 transition-colors" title="Logout">
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          ) : (
            <Link href="/auth/login" className="text-white/80 hover:text-gold transition-colors" title="Sign In">
              <User size={20} />
            </Link>
          )}
          <Link href="/wishlist" className="text-white/80 hover:text-gold transition-colors relative" title="Wishlist">
            <Heart size={20} />
            {wishlistTotal > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlistTotal}
              </span>
            )}
          </Link>
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

              <div className="flex flex-col space-y-8 overflow-y-auto pb-6">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    {link.dropdown ? (
                      <div className="flex flex-col">
                        <button
                          onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                          className={cn(
                            'text-2xl font-serif tracking-widest transition-colors flex items-center justify-between w-full text-left',
                            isMobileDropdownOpen ? 'text-gold' : 'text-white'
                          )}
                        >
                          {link.name}
                          <ChevronDown
                            size={20}
                            className={cn(
                              'transition-transform duration-300',
                              isMobileDropdownOpen ? 'rotate-180 text-gold' : 'text-white/50'
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {isMobileDropdownOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden flex flex-col space-y-4 pl-4 mt-4 border-l border-gold/20"
                            >
                              {link.dropdown.map(dropLink => (
                                 <Link
                                   key={dropLink.href}
                                   href={dropLink.href}
                                   onClick={() => {
                                     setIsMobileMenuOpen(false);
                                     setIsMobileDropdownOpen(false);
                                   }}
                                   className={cn(
                                     'text-xl font-serif tracking-widest hover:text-gold transition-colors block py-2',
                                     pathname === dropLink.href ? 'text-gold' : 'text-white/70'
                                   )}
                                 >
                                   {dropLink.name}
                                 </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={link.href!}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'text-2xl font-serif tracking-widest hover:text-gold transition-colors block',
                          pathname === link.href ? 'text-gold' : 'text-white'
                        )}
                      >
                        {link.name}
                      </Link>
                    )}
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
