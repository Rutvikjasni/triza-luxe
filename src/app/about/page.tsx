import React from 'react'
import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'About Us - Triza Luxe',
  description: 'Learn more about Triza Luxe and our commitment to fast fashion jewelry.',
}

export default async function AboutPage() {
  const supabase = await createClient()

  // Fetch the dynamic content from database
  const { data, error } = await supabase
    .from('about_us')
    .select('*')
    .eq('id', '11111111-1111-1111-1111-111111111111')
    .single()

  // Fallback to default content if table doesn't exist or row is missing
  const content = data || {
    intro_text: 'Founded in 2026 by Rutvik Jasani, Triza Luxe is setting new trends in the fast fashion jewelry industry. The founder overcame early skepticism to achieve phenomenal success, delivering over 6,000 orders across India.',
    design_philosophy: 'At Triza Luxe, every piece is crafted with the latest trends in mind. Our jewelry collections reflect the ever-changing style preferences of our customers, allowing individuals to express their personality and uniqueness through wearable art. We believe that jewelry is more than just an accessory—it\'s a powerful expression of self.',
    womens_empowerment: 'Triza Luxe proudly champions women\'s empowerment, employing a predominantly female workforce (95%). This decision reflects the brand\'s commitment to creating an inclusive work environment and supporting women in the workforce.',
    collection_house: 'Our curated collections include chic bracelets, celebrity-inspired mangalsutras, and everyday wear jewelry. Designed by our in-house team, each piece is meticulously handcrafted by skilled artisans, ensuring that every item meets the highest standards of craftsmanship and style.',
    celebrity_favorites: 'Triza Luxe has had the honor of being worn by some of India\'s most renowned actresses, including Ananya Pandey, Mouni Roy, Ankita Lokhande, Surbhi Chandna, and Ridhi Dogra. Our jewelry has graced various high-profile occasions, solidifying Triza Luxe as a trusted and coveted brand among style icons and fashion-forward individuals.',
    national_reach: 'With a robust national presence, Triza Luxe is quickly becoming one of the top D2C fast fashion jewelry brands. Our mission is to provide high-quality, stylish jewelry at affordable prices, making it accessible to customers across India. As we continue to expand, our vision remains clear: to become the leading D2C fast fashion jewelry brand in India.',
    founder_name: 'Rutvik Jasani',
    team_size: '28 members',
    industry: 'Fast Fashion Jewelry',
    orders_text: 'Delivered over 6,000 orders across India',
    quote_text: '"Triza Luxe is more than just a jewelry brand; it\'s a movement. Our innovative designs and commitment to quality continue to make waves in the fashion jewelry world."'
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-screen text-white/90">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
          About <span className="text-gold italic">Us</span>
        </h1>
        <div className="w-16 h-[1px] bg-gold mx-auto" />
      </div>

      <div className="space-y-12 font-light leading-relaxed text-lg">
        <section>
          <h2 className="text-2xl md:text-3xl font-serif text-gold mb-4">Triza Luxe: Redefining the Fast Fashion Jewelry Industry</h2>
          <p className="whitespace-pre-wrap">{content.intro_text}</p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-serif text-gold mb-4">Design Philosophy: Trendy, Timeless, and Personal</h2>
          <p className="whitespace-pre-wrap">{content.design_philosophy}</p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-serif text-gold mb-4">Commitment to Women's Empowerment</h2>
          <p className="whitespace-pre-wrap">{content.womens_empowerment}</p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-serif text-gold mb-4">TRIZA LUXE's Collection House: A World of Style</h2>
          <p className="whitespace-pre-wrap">{content.collection_house}</p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-serif text-gold mb-4">Celebrity Favorites: Adorning Style Icons</h2>
          <p className="whitespace-pre-wrap">{content.celebrity_favorites}</p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-serif text-gold mb-4">National Reach and Impact: A Growing Jewelry Empire</h2>
          <p className="whitespace-pre-wrap">{content.national_reach}</p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-serif text-gold mb-6">Company Overview:</h2>
          <ul className="list-disc list-inside space-y-3 pl-4">
            <li><strong className="text-gold font-normal">Founder:</strong> {content.founder_name}</li>
            <li><strong className="text-gold font-normal">Team Size:</strong> {content.team_size}</li>
            <li><strong className="text-gold font-normal">Industry:</strong> {content.industry}</li>
            <li><strong className="text-gold font-normal">National Reach:</strong> {content.orders_text}</li>
          </ul>
        </section>

        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-xl italic text-gold font-serif whitespace-pre-wrap">
            {content.quote_text}
          </p>
        </div>
      </div>
    </div>
  )
}
