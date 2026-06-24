'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  FolderTree, 
  Mail, 
  Star, 
  Info, 
  ShieldCheck,
  LogOut
} from 'lucide-react'

const menuItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Categories', href: '/admin/categories', icon: FolderTree },
  { name: 'Contact', href: '/admin/contact', icon: Mail },
  { name: 'Reviews', href: '/admin/reviews', icon: Star },
  { name: 'About Us', href: '/admin/about-us', icon: Info },
  { name: 'Privacy Policy', href: '/admin/privacy-policy', icon: ShieldCheck },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-screen bg-zinc-950 border-r border-gold/10 fixed left-0 top-0 pt-6 flex flex-col z-50">
      <div className="px-6 mb-10">
        <Link href="/" className="text-xl font-serif tracking-[0.2em] text-gold uppercase transition-colors duration-300">
          Triza Luxe
        </Link>
        <div className="text-[10px] tracking-[0.4em] text-white/50 uppercase mt-0.5">
          Admin Panel
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-none transition-all duration-200 ${
                isActive 
                  ? 'bg-gold/10 text-gold border-r-2 border-gold' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm font-medium tracking-wider">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gold/10 mt-auto">
        <form action="/auth/signout" method="post">
          <button type="submit" className="flex items-center space-x-3 px-4 py-3 w-full text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200">
            <LogOut size={20} />
            <span className="text-sm font-medium tracking-wider">Sign Out</span>
          </button>
        </form>
      </div>
    </aside>
  )
}
