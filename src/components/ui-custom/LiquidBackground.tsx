'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function LiquidBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-black pointer-events-none">
      {/* Static gradient fallback for mobile */}
      <div className="md:hidden absolute inset-0 bg-gradient-to-tr from-gold/10 via-black to-amber-900/10" />

      {/* Animated Gradient Orbs - hidden on mobile for performance */}
      <div className="hidden md:block">
        <motion.div
          animate={{
            x: ["0%", "20%", "-20%", "0%"],
            y: ["0%", "-20%", "20%", "0%"],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-r from-gold/20 to-amber-600/10 blur-[120px] opacity-60 mix-blend-screen"
        />
        
        <motion.div
          animate={{
            x: ["0%", "-30%", "10%", "0%"],
            y: ["0%", "30%", "-10%", "0%"],
            scale: [1, 0.9, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-[40%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-l from-yellow-500/10 to-gold/20 blur-[150px] opacity-50 mix-blend-screen"
        />

        <motion.div
          animate={{
            x: ["0%", "40%", "-10%", "0%"],
            y: ["0%", "10%", "-40%", "0%"],
            scale: [1, 1.4, 0.9, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-[20%] left-[20%] w-[80vw] h-[80vw] rounded-full bg-gradient-to-tr from-amber-700/20 to-yellow-600/10 blur-[130px] opacity-40 mix-blend-screen"
        />
      </div>

      {/* Grain overlay for premium texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 md:opacity-20 md:mix-blend-overlay"></div>
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-80"></div>
    </div>
  )
}
