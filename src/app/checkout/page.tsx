'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Script from 'next/script'
import { CheckCircle2, Loader2, ShieldCheck } from 'lucide-react'
import { useCart } from '@/store/CartContext'
import { Button } from '@/components/ui/button'

export default function CheckoutPage() {
  const { items, totalPrice, totalItems, clearCart } = useCart()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  })

  // Prevent hydration errors and redirect if empty cart
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
    if (items.length === 0 && !isSuccess) {
      router.push('/collections')
    }
  }, [items.length, router, isSuccess])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // 1. Create order on server (Razorpay + Supabase Pending Order)
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, shipping: formData, amount: totalPrice }),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Something went wrong')

      // 2. Initialize Razorpay Checkout
      const rzpKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID

      // --- DEMO MODE BYPASS (If no keys are provided) ---
      if (!rzpKey || rzpKey === 'rzp_test_fallback') {
        const confirmDemo = window.confirm("Razorpay API keys not found. Do you want to run a DEMO PAYMENT right now?")
        if (confirmDemo) {
          const verifyRes = await fetch('/api/checkout/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: data.razorpayOrder.id,
              razorpay_payment_id: 'demo_pay_' + Math.floor(Math.random() * 1000000),
              razorpay_signature: 'demo_signature',
              supabase_order_id: data.supabaseOrderId,
            }),
          })
          const verifyData = await verifyRes.json()

          if (verifyRes.ok && verifyData.success) {
            setIsSuccess(true)
            clearCart()
          } else {
            alert('Demo Payment verification failed!')
          }
        }
        setIsLoading(false)
        return
      }
      // --- END DEMO MODE BYPASS ---

      const options = {
        key: rzpKey, // Use public key here
        amount: data.razorpayOrder.amount,
        currency: data.razorpayOrder.currency,
        name: 'Triza Luxe',
        description: 'Imitation Jewelry Purchase',
        order_id: data.razorpayOrder.id,
        handler: async function (response: any) {
          // 3. Verify Payment
          const verifyRes = await fetch('/api/checkout/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              supabase_order_id: data.supabaseOrderId,
            }),
          })
          const verifyData = await verifyRes.json()

          if (verifyRes.ok && verifyData.success) {
            setIsSuccess(true)
            clearCart()
          } else {
            alert('Payment verification failed!')
          }
        },
        prefill: {
          name: formData.name,
          contact: formData.phone,
        },
        theme: {
          color: '#D4AF37', // Gold color
        },
      }

      const paymentObject = new (window as any).Razorpay(options)
      paymentObject.open()

      paymentObject.on('payment.failed', function (response: any) {
        alert(`Payment Failed: ${response.error.description}`)
      })
    } catch (error: any) {
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) return null

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center">
        <CheckCircle2 className="w-24 h-24 text-green-500 mb-6" />
        <h1 className="text-4xl font-serif text-white mb-4">Payment Successful!</h1>
        <p className="text-white/60 mb-8 max-w-md">
          Thank you for your purchase. Your order has been placed successfully and will be shipped soon.
        </p>
        <Button onClick={() => router.push('/collections')} className="bg-gold text-black hover:bg-gold/90 font-bold tracking-widest px-8 py-6 rounded-none">
          CONTINUE SHOPPING
        </Button>
      </div>
    )
  }

  return (
    <>
      <Script id="razorpay-checkout-js" src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
        <h1 className="text-3xl font-serif text-white mb-10 tracking-widest uppercase">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Form Section */}
          <div>
            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>
              
              <h2 className="text-xl font-serif text-white mb-8 uppercase tracking-widest flex items-center gap-3">
                <span className="w-8 h-[1px] bg-gold"></span>
                Shipping Details
              </h2>
              
              <form id="checkout-form" onSubmit={handlePayment} className="space-y-6 relative z-10">
                {/* Contact Section */}
                <div className="space-y-4">
                  <h3 className="text-xs uppercase tracking-widest text-gold/70 mb-2">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-white/50 pl-1">Full Name</label>
                      <input required type="text" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} className="w-full bg-white/5 border-b border-white/10 px-4 py-3 text-white outline-none focus:bg-white/10 focus:border-gold transition-all duration-300 placeholder:text-white/20" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-white/50 pl-1">Phone Number</label>
                      <input required type="tel" name="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} className="w-full bg-white/5 border-b border-white/10 px-4 py-3 text-white outline-none focus:bg-white/10 focus:border-gold transition-all duration-300 placeholder:text-white/20" />
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div className="space-y-4 pt-4">
                  <h3 className="text-xs uppercase tracking-widest text-gold/70 mb-2">Delivery Address</h3>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-white/50 pl-1">Complete Address</label>
                    <input required type="text" name="address" placeholder="House/Flat No., Street, Landmark" value={formData.address} onChange={handleChange} className="w-full bg-white/5 border-b border-white/10 px-4 py-3 text-white outline-none focus:bg-white/10 focus:border-gold transition-all duration-300 placeholder:text-white/20" />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-5 pt-2">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-white/50 pl-1">City</label>
                      <input required type="text" name="city" placeholder="Mumbai" value={formData.city} onChange={handleChange} className="w-full bg-white/5 border-b border-white/10 px-4 py-3 text-white outline-none focus:bg-white/10 focus:border-gold transition-all duration-300 placeholder:text-white/20" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-white/50 pl-1">State</label>
                      <input required type="text" name="state" placeholder="Maharashtra" value={formData.state} onChange={handleChange} className="w-full bg-white/5 border-b border-white/10 px-4 py-3 text-white outline-none focus:bg-white/10 focus:border-gold transition-all duration-300 placeholder:text-white/20" />
                    </div>
                    <div className="space-y-1.5 col-span-2 md:col-span-1">
                      <label className="text-[10px] uppercase tracking-widest text-white/50 pl-1">PIN Code</label>
                      <input required type="text" name="zip" placeholder="400001" value={formData.zip} onChange={handleChange} className="w-full bg-white/5 border-b border-white/10 px-4 py-3 text-white outline-none focus:bg-white/10 focus:border-gold transition-all duration-300 placeholder:text-white/20" />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="mt-8 p-5 bg-gradient-to-r from-gold/10 to-transparent border-l-2 border-gold flex items-center gap-5 text-white/70 text-sm">
              <ShieldCheck className="w-10 h-10 text-gold flex-shrink-0" />
              <div>
                <h4 className="text-white font-medium mb-1">Secure Checkout</h4>
                <p className="text-xs">Your payment is encrypted and processed securely by Razorpay. We do not store any card details.</p>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="bg-white/5 p-6 md:p-8 border border-white/10 flex flex-col h-fit sticky top-32">
            <h2 className="text-xl font-medium text-white mb-6 uppercase tracking-wider">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-16 h-16 bg-white/10 flex-shrink-0">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm text-white/90 line-clamp-1">{item.title}</h3>
                    <p className="text-xs text-white/50 mt-1">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-gold font-serif">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 space-y-3 mb-8">
              <div className="flex justify-between text-white/60 text-sm">
                <span>Subtotal ({totalItems} items)</span>
                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-white/60 text-sm">
                <span>Shipping</span>
                <span className="text-green-400">FREE</span>
              </div>
              <div className="flex justify-between text-white font-serif text-xl pt-3 border-t border-white/10 mt-3">
                <span>Total</span>
                <span className="text-gold">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <Button 
              type="submit" 
              form="checkout-form"
              disabled={isLoading}
              className="w-full h-14 bg-gold text-black hover:bg-gold/90 font-bold tracking-widest text-lg rounded-none transition-all flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
              {isLoading ? 'PROCESSING...' : `PAY ₹${totalPrice.toLocaleString('en-IN')}`}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
