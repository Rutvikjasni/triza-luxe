import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shipping Policy - Triza Luxe',
  description: 'Shipping Policy for Triza Luxe.',
}

export default function ShippingPolicyPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-screen text-white/90">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
          Shipping <span className="text-gold italic">Policy</span>
        </h1>
        <div className="w-16 h-[1px] bg-gold mx-auto" />
      </div>

      <div className="prose prose-invert prose-gold max-w-none">
        <h2 className="text-2xl md:text-3xl font-serif text-gold mt-12 mb-6">1. Delivery Locations</h2>
        <p className="mb-6 font-light leading-relaxed text-lg text-white/80">
          We deliver our premium imitation jewelry all across India. Currently, we do not support international shipping outside of India.
        </p>

        <h2 className="text-2xl md:text-3xl font-serif text-gold mt-12 mb-6">2. Shipping Charges</h2>
        <p className="mb-6 font-light leading-relaxed text-lg text-white/80">
          We offer <strong>Free Standard Shipping</strong> on all prepaid orders across India. For Cash on Delivery (COD) orders, a nominal convenience charge of ₹99 may apply, depending on the delivery pin code.
        </p>

        <h2 className="text-2xl md:text-3xl font-serif text-gold mt-12 mb-6">3. Processing & Delivery Time</h2>
        <p className="mb-6 font-light leading-relaxed text-lg text-white/80">
          All orders are processed within 1-2 business days. Delivery typically takes:
        </p>
        <ul className="list-disc list-inside mb-6 font-light leading-relaxed text-lg text-white/80 space-y-2 pl-4">
          <li><strong>Metro Cities:</strong> 2 to 4 business days.</li>
          <li><strong>Rest of India:</strong> 4 to 7 business days.</li>
        </ul>
        <p className="mb-6 font-light leading-relaxed text-lg text-white/80">
          Please note that delivery times are estimates and may be affected by public holidays, weather conditions, or unforeseen courier delays.
        </p>

        <h2 className="text-2xl md:text-3xl font-serif text-gold mt-12 mb-6">4. Order Tracking</h2>
        <p className="mb-6 font-light leading-relaxed text-lg text-white/80">
          Once your order has been dispatched, you will receive an email and SMS with the tracking details and a link to track your shipment online.
        </p>

        <h2 className="text-2xl md:text-3xl font-serif text-gold mt-12 mb-6">5. Failed Deliveries</h2>
        <p className="mb-6 font-light leading-relaxed text-lg text-white/80">
          Our courier partners will attempt delivery 3 times before returning the package to us. Please ensure your contact number is reachable and your delivery address is accurate. If an order is returned due to incorrect details, reshipping charges may apply.
        </p>
      </div>
    </div>
  )
}
