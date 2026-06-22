'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: "What material is your jewelry made of?",
    answer: "Our jewelry is crafted from high-quality base metals (such as brass and copper) and heavily plated with gold or rhodium. We use premium imitation stones, including cubic zirconia and faux pearls, to ensure a luxurious finish that mimics real fine jewelry."
  },
  {
    question: "Is your jewelry hypoallergenic?",
    answer: "Yes, we strive to make our jewelry as skin-friendly as possible. Most of our pieces are lead and nickel-free, making them suitable for sensitive skin. However, if you have severe allergies, we recommend checking the specific product details."
  },
  {
    question: "How do I care for my Triza Luxe pieces?",
    answer: "To maintain the brilliance of your jewelry, keep it away from water, perfumes, and harsh chemicals. Store each piece separately in a soft pouch or the original box provided to prevent scratches and oxidation."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Currently, we offer shipping pan-India. We are actively working on expanding our delivery network to cater to our international customers in the near future."
  },
  {
    question: "What is your return and exchange policy?",
    answer: "We offer a 7-day return policy for items in their original, unworn condition with tags attached. Please note that custom-made pieces or earrings (for hygiene reasons) are non-returnable unless defective."
  },
  {
    question: "How long does delivery take?",
    answer: "Standard delivery within India typically takes 3-7 business days depending on your location. Once your order is dispatched, you will receive a tracking link via email."
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-3xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
          Frequently Asked <span className="text-gold italic">Questions</span>
        </h1>
        <div className="w-16 h-[1px] bg-gold mx-auto" />
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
              <span className="text-lg font-medium text-white">{faq.question}</span>
              <span className="text-gold flex-shrink-0 ml-4">
                {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </span>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 text-white/70 font-light leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-16 text-center border-t border-gold/20 pt-12">
        <h3 className="text-xl font-serif text-white mb-4">Still have questions?</h3>
        <p className="text-white/60 font-light mb-6">
          We're here to help. Reach out to our customer support team.
        </p>
        <a 
          href="/contact" 
          className="inline-block border border-gold text-gold hover:bg-gold hover:text-black transition-colors duration-300 px-8 py-3 tracking-widest text-sm uppercase"
        >
          Contact Us
        </a>
      </div>
    </div>
  )
}
