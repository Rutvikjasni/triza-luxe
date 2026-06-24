import React from 'react'

export default function Loading() {
  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center bg-transparent">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-gold/20 border-t-gold rounded-full animate-spin mb-4" />
        <p className="text-gold tracking-[0.2em] uppercase text-sm font-serif animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  )
}
