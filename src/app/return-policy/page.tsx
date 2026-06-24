import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Return & Refund Policy - Triza Luxe',
  description: 'Return and Refund Policy for Triza Luxe.',
}

export default function ReturnPolicyPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-screen text-white/90">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
          Return & Refund <span className="text-gold italic">Policy</span>
        </h1>
        <div className="w-16 h-[1px] bg-gold mx-auto" />
      </div>

      <div className="prose prose-invert prose-gold max-w-none">
        <h2 className="text-2xl md:text-3xl font-serif text-gold mt-12 mb-6">1. Return Window</h2>
        <p className="mb-6 font-light leading-relaxed text-lg text-white/80">
          We offer a 7-day return window for all our jewelry pieces from the date of delivery. If 7 days have gone by since your purchase was delivered, unfortunately, we cannot offer you a refund or exchange.
        </p>

        <h2 className="text-2xl md:text-3xl font-serif text-gold mt-12 mb-6">2. Eligibility for Returns</h2>
        <p className="mb-6 font-light leading-relaxed text-lg text-white/80">
          To be eligible for a return, your item must be unused, unworn, and in the same condition that you received it. It must also be in the original packaging with all tags attached. 
        </p>
        <ul className="list-disc list-inside mb-6 font-light leading-relaxed text-lg text-white/80 space-y-2 pl-4">
          <li>Customized or personalized jewelry items are not eligible for returns.</li>
          <li>Items purchased during a sale or with promotional codes may have different return conditions.</li>
        </ul>

        <h2 className="text-2xl md:text-3xl font-serif text-gold mt-12 mb-6">3. Process for Returns</h2>
        <p className="mb-6 font-light leading-relaxed text-lg text-white/80">
          To initiate a return, please contact our support team via WhatsApp at +91 87358 00946 or email us at contact@trizaluxe.com. Please include your order number and the reason for the return. Our team will arrange a reverse pickup from your shipping address in India.
        </p>

        <h2 className="text-2xl md:text-3xl font-serif text-gold mt-12 mb-6">4. Refunds</h2>
        <p className="mb-6 font-light leading-relaxed text-lg text-white/80">
          Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed within 5-7 working days, and a credit will automatically be applied to your original method of payment (e.g., Credit Card, UPI, Net Banking).
        </p>

        <h2 className="text-2xl md:text-3xl font-serif text-gold mt-12 mb-6">5. Damaged or Defective Items</h2>
        <p className="mb-6 font-light leading-relaxed text-lg text-white/80">
          In the rare event that you receive a damaged or defective item, please contact us within 48 hours of delivery with an unboxing video and clear photos. We will arrange a free replacement or a full refund as per your preference.
        </p>
      </div>
    </div>
  )
}
