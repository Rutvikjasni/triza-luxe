'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'

interface ProductImageMagnifierProps {
  src: string
  alt: string
}

export function ProductImageMagnifier({ src, alt }: ProductImageMagnifierProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const imageContainerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return
    
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    
    setMousePosition({ x, y })
  }

  return (
    <div 
      ref={imageContainerRef}
      className="relative aspect-[4/5] bg-white/5 border border-gold/10 w-full overflow-hidden cursor-crosshair group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false)
        setTimeout(() => setMousePosition({ x: 50, y: 50 }), 300)
      }}
      onMouseMove={handleMouseMove}
    >
      <div 
        className="absolute inset-0 transition-transform duration-200 ease-out z-0 w-full h-full"
        style={{
          transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
          transform: isHovering ? 'scale(2.5)' : 'scale(1)',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  )
}
