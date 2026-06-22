'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const reviews = [
  {
    id: 1,
    name: "Aarohi Desai",
    location: "Mumbai, India",
    rating: 5,
    text: "The quality of the jewelry is absolutely stunning. I wore the Kundan set for my sister's wedding and received so many compliments. It looks exactly like real gold!",
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Delhi, India",
    rating: 5,
    text: "I was skeptical about buying imitation jewelry online, but Triza Luxe exceeded my expectations. The craftsmanship is flawless, and the packaging was so luxurious.",
  },
  {
    id: 3,
    name: "Sneha Patel",
    location: "Ahmedabad, India",
    rating: 5,
    text: "Excellent customer service and beautiful designs. I have sensitive skin, but their pieces are truly hypoallergenic. Will definitely be shopping here again for upcoming festivals.",
  }
]

export function CustomerReviews() {
  return (
    <section className="py-24 bg-transparent relative z-10 border-t border-gold/10">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif text-white mb-4"
          >
            Client <span className="text-gold italic">Testimonials</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-[1px] bg-gold"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 flex flex-col items-center text-center relative group hover:border-gold/30 transition-colors duration-500"
            >
              <div className="flex gap-1 mb-6 text-gold">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-white/80 font-light leading-relaxed mb-8 flex-grow italic">
                "{review.text}"
              </p>
              <div>
                <h4 className="text-white font-medium tracking-wide uppercase text-sm mb-1">{review.name}</h4>
                <p className="text-gold/60 text-xs tracking-wider uppercase">{review.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
