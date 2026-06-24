'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Mail, Phone, MapPin } from 'lucide-react'

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
)

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

const TwitterIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
)

export function Footer() {
  const pathname = usePathname()
  if (pathname.startsWith('/admin')) return null

  return (
    <footer className="bg-transparent text-white border-t border-gold/10 pt-20 pb-10 px-6 md:px-12 relative z-10">
      <div className="absolute inset-0 bg-[#0a0a0a] -z-10" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex flex-col group">
              <span className="text-2xl font-serif tracking-[0.2em] text-gold uppercase transition-colors duration-300">
                Triza Luxe
              </span>
              <span className="text-[10px] tracking-[0.4em] text-white/50 uppercase mt-0.5">
                Imitation Jewelry
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Exquisite imitation jewelry crafted for the modern individual who seeks luxury without compromise. Excellence in every detail.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="https://www.instagram.com/triza_luxe?igsh=ZW9ieTVremJwczZq&utm_source=qr" target="_blank" rel="noopener noreferrer" className="p-2 border border-gold/20 hover:border-gold hover:text-gold transition-all duration-300 rounded-full">
                <InstagramIcon size={18} />
              </a>
              <span className="p-2 border border-gold/20 opacity-30 cursor-not-allowed rounded-full" title="Coming soon">
                <FacebookIcon size={18} />
              </span>
              <span className="p-2 border border-gold/20 opacity-30 cursor-not-allowed rounded-full" title="Coming soon">
                <TwitterIcon size={18} />
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold tracking-[0.3em] uppercase text-gold">Shop</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link href="/collections" className="hover:text-gold transition-colors">All Collections</Link></li>
              <li><Link href="/category/necklaces" className="hover:text-gold transition-colors">Necklaces</Link></li>
              <li><Link href="/category/mangalsutra" className="hover:text-gold transition-colors">Mangalsutra</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold tracking-[0.3em] uppercase text-gold">Explore</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link href="/about" className="hover:text-gold transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-gold transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-gold transition-colors">FAQ</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-gold transition-colors">Shipping Policy</Link></li>
              <li><Link href="/return-policy" className="hover:text-gold transition-colors">Return Policy</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold tracking-[0.3em] uppercase text-gold">Contact</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-gold mt-0.5 shrink-0" />
                <span>Surat, Gujarat, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-gold shrink-0" />
                <span>+91 87358 00946</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-gold shrink-0" />
                <span>contact@trizaluxe.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-gold/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/40 tracking-widest gap-4">
          <p>© {new Date().getFullYear()} TRIZA LUXE. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6">
            <Link href="/terms-and-conditions" className="hover:text-gold">TERMS & CONDITIONS</Link>
            <Link href="/privacy-policy" className="hover:text-gold">PRIVACY POLICY</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
