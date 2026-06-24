import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions - Triza Luxe',
  description: 'Terms and Conditions for Triza Luxe.',
}

export default function TermsConditionsPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-screen text-white/90">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
          Terms & <span className="text-gold italic">Conditions</span>
        </h1>
        <div className="w-16 h-[1px] bg-gold mx-auto" />
      </div>

      <div className="prose prose-invert prose-gold max-w-none">
        <p className="mb-6 font-light leading-relaxed text-lg text-white/80">
          Welcome to Triza Luxe. By accessing or using our website, you agree to be bound by these Terms and Conditions and our Privacy Policy.
        </p>

        <h2 className="text-2xl md:text-3xl font-serif text-gold mt-12 mb-6">1. General Conditions</h2>
        <p className="mb-6 font-light leading-relaxed text-lg text-white/80">
          We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted and involve transmissions over various networks.
        </p>

        <h2 className="text-2xl md:text-3xl font-serif text-gold mt-12 mb-6">2. Products and Pricing</h2>
        <p className="mb-6 font-light leading-relaxed text-lg text-white/80">
          All prices for our jewelry are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time. We have made every effort to display as accurately as possible the colors and images of our products.
        </p>

        <h2 className="text-2xl md:text-3xl font-serif text-gold mt-12 mb-6">3. Accuracy of Billing and Account Information</h2>
        <p className="mb-6 font-light leading-relaxed text-lg text-white/80">
          You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.
        </p>

        <h2 className="text-2xl md:text-3xl font-serif text-gold mt-12 mb-6">4. User Comments and Feedback</h2>
        <p className="mb-6 font-light leading-relaxed text-lg text-white/80">
          If, at our request, you send certain specific submissions or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials, you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us.
        </p>

        <h2 className="text-2xl md:text-3xl font-serif text-gold mt-12 mb-6">5. Governing Law</h2>
        <p className="mb-6 font-light leading-relaxed text-lg text-white/80">
          These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of India, under the jurisdiction of the courts in Surat, Gujarat.
        </p>
      </div>
    </div>
  )
}
