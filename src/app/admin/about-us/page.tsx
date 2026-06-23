import React from 'react'
import { createClient } from '@/lib/supabase/server'
import { AboutUsForm } from '@/components/admin/AboutUsForm'

export default async function ManageAboutUsPage() {
  const supabase = await createClient()

  // Fetch the current about us data
  const { data, error } = await supabase
    .from('about_us')
    .select('*')
    .eq('id', '11111111-1111-1111-1111-111111111111')
    .single()

  if (error && error.code !== 'PGRST116') {
    // Note: PGRST116 means no rows found, which might happen if setup script isn't run
    console.error('Error fetching about us data:', error)
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-serif text-white mb-2">Manage About Us Page</h1>
      <p className="text-white/50 mb-10">Update the content displayed on the public About Us page.</p>

      {!data && (
        <div className="mb-8 p-4 border border-yellow-500/50 bg-yellow-500/10 text-yellow-400">
          <strong>Warning:</strong> The database table for the About Us page might not be set up yet. 
          Please run the `supabase_about_us_setup.sql` script in your Supabase SQL Editor first.
        </div>
      )}

      <AboutUsForm initialData={data || {}} />
    </div>
  )
}
