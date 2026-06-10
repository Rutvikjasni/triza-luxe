import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <h1 className="text-8xl md:text-9xl font-serif text-gold mb-4 opacity-50">404</h1>
      <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">Page Not Found</h2>
      <p className="text-white/60 mb-10 max-w-md font-light">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href="/">
        <Button className="bg-gold hover:bg-gold/90 text-black font-bold tracking-widest px-8 py-6 rounded-none">
          RETURN TO HOME
        </Button>
      </Link>
    </div>
  )
}
