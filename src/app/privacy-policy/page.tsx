import React from 'react'
import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import ReactMarkdown from 'react-markdown'

export const metadata: Metadata = {
  title: 'Privacy Policy - Triza Luxe',
  description: 'Privacy Policy and Terms of Service for Triza Luxe.',
}

export default async function PrivacyPolicyPage() {
  const supabase = await createClient()

  // Fetch the dynamic content from database
  const { data, error } = await supabase
    .from('privacy_policy')
    .select('*')
    .eq('id', '22222222-2222-2222-2222-222222222222')
    .single()

  // Fallback to default content if table doesn't exist or row is missing
  const content = data?.content || `## PERSONAL INFORMATION WE COLLECT
When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as "Device Information".

## WE COLLECT DEVICE INFORMATION USING THE FOLLOWING TECHNOLOGIES:
"Cookies" are data files that are placed on your device or computer and often include an anonymous unique identifier.
- "Log files" track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.
- "Web beacons", "tags", and "pixels" are electronic files used to record information about how you browse the Site.

## HOW DO WE USE YOUR PERSONAL INFORMATION?
We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:
- Communicate with you;
- Screen our orders for potential risk or fraud; and
- When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.

A "cookie" is a small piece of information stored by a web server on a web browser so it can be later read back from that browser. Cookies are useful for enabling the browser to remember information specific to a given user. We place both permanent and temporary cookies in your computer’s hard drive. The cookies do not contain any of your personally identifiable information.

We do not store in cookies any passwords or credit card information, any information that personally identifies you.

We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).

Triza Luxe websites/Software are not directed at or targeted at children. No one who has not reached the age of thirteen may use the websites/Software unless supervised by an adult.`

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-screen text-white/90">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
          Privacy <span className="text-gold italic">Policy</span>
        </h1>
        <div className="w-16 h-[1px] bg-gold mx-auto" />
      </div>

      <div className="prose prose-invert prose-gold max-w-none">
        <ReactMarkdown
          components={{
            h2: ({node, ...props}) => <h2 className="text-2xl md:text-3xl font-serif text-gold mt-12 mb-6" {...props} />,
            p: ({node, ...props}) => <p className="mb-6 font-light leading-relaxed text-lg text-white/80" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc list-inside mb-6 font-light leading-relaxed text-lg text-white/80 space-y-2 pl-4" {...props} />,
            li: ({node, ...props}) => <li {...props} />,
            a: ({node, ...props}) => <a className="text-gold hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}
