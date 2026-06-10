import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about TRIZA LUXE and our commitment to luxury imitation jewelry.',
}

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
          Our <span className="text-gold italic">Story</span>
        </h1>
        <div className="w-16 h-[1px] bg-gold mx-auto" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <div className="relative aspect-[4/3] border border-gold/20 p-4">
          <div className="relative w-full h-full overflow-hidden bg-white/5">
            <Image
              src="https://images.unsplash.com/photo-1573408301145-b98c4af06b8f?q=80&w=1000&auto=format&fit=crop"
              alt="Our Craft"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="space-y-6 text-white/80 font-light leading-relaxed text-lg">
          <h2 className="text-3xl font-serif text-gold mb-6">The Triza Luxe Vision</h2>
          <p>
            Founded with a passion for exquisite design and accessible luxury, Triza Luxe was born from the desire to offer premium jewelry experiences without the premium price tag.
          </p>
          <p>
            We understand that jewelry is more than just an accessory; it's a statement, a memory, and a reflection of your inner radiance. Our collection is meticulously curated to ensure every piece meets our exacting standards of quality and beauty.
          </p>
          <p>
            By leveraging modern craftsmanship and partnering with skilled artisans, we bring you imitation jewelry that rivals the brilliance of authentic diamonds and solid gold.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-row-reverse lg:flex-row-reverse">
        <div className="relative aspect-[4/3] border border-gold/20 p-4 lg:order-2">
          <div className="relative w-full h-full overflow-hidden bg-white/5">
            <Image
              src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop"
              alt="Our Promise"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="space-y-6 text-white/80 font-light leading-relaxed text-lg lg:order-1">
          <h2 className="text-3xl font-serif text-gold mb-6">Our Promise</h2>
          <p>
            <strong>Uncompromising Quality:</strong> Every piece is inspected for flawless finish, durable plating, and secure settings.
          </p>
          <p>
            <strong>Timeless Design:</strong> Our catalog blends traditional heritage with contemporary trends, ensuring you find the perfect piece for any occasion.
          </p>
          <p>
            <strong>Customer Satisfaction:</strong> Your delight is our ultimate goal. We strive to provide a seamless shopping experience, from browsing our curated collection to the moment you wear our jewelry.
          </p>
        </div>
      </div>
    </div>
  )
}
