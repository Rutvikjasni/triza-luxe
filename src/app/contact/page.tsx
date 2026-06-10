import React from 'react'
import { Metadata } from 'next'
import { Mail, Phone, MapPin } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with TRIZA LUXE for any inquiries about our imitation jewelry.',
}

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
          Get in <span className="text-gold italic">Touch</span>
        </h1>
        <div className="w-16 h-[1px] bg-gold mx-auto mb-6" />
        <p className="text-white/60 max-w-2xl mx-auto font-light">
          We are here to assist you with any questions about our collections, your order, or general inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Information */}
        <div className="space-y-12">
          <div className="bg-white/5 border border-gold/10 p-8">
            <h2 className="text-2xl font-serif text-gold mb-8">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gold/10 rounded-full">
                  <MapPin className="text-gold w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold tracking-widest uppercase text-sm mb-1">Our Boutique</h3>
                  <p className="text-white/60 font-light">
                    Luxury Lane, Diamond District<br />
                    Mumbai, Maharashtra 400001<br />
                    India
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gold/10 rounded-full">
                  <Phone className="text-gold w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold tracking-widest uppercase text-sm mb-1">Phone</h3>
                  <p className="text-white/60 font-light">
                    +91 98765 43210<br />
                    Mon-Fri: 10am - 7pm IST
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gold/10 rounded-full">
                  <Mail className="text-gold w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold tracking-widest uppercase text-sm mb-1">Email</h3>
                  <p className="text-white/60 font-light">
                    contact@trizaluxe.com<br />
                    support@trizaluxe.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/5 border border-gold/10 p-8">
          <h2 className="text-2xl font-serif text-gold mb-8">Send a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/70">First Name</label>
                <Input className="bg-white/5 border-gold/20 focus-visible:ring-gold rounded-none h-12 text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/70">Last Name</label>
                <Input className="bg-white/5 border-gold/20 focus-visible:ring-gold rounded-none h-12 text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/70">Email Address</label>
              <Input type="email" className="bg-white/5 border-gold/20 focus-visible:ring-gold rounded-none h-12 text-white" />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/70">Message</label>
              <textarea 
                rows={5}
                className="w-full bg-white/5 border border-gold/20 focus-visible:ring-gold focus-visible:outline-none p-3 text-white rounded-none resize-none"
              ></textarea>
            </div>

            <Button className="w-full h-14 bg-gold hover:bg-gold/90 text-black font-bold tracking-widest rounded-none">
              SEND MESSAGE
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
