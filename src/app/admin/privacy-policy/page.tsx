import React from 'react'
import { createClient } from '@/lib/supabase/server'
import { PrivacyPolicyForm } from '@/components/admin/PrivacyPolicyForm'

export default async function ManagePrivacyPolicyPage() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('privacy_policy')
    .select('*')
    .eq('id', '22222222-2222-2222-2222-222222222222')
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching privacy policy data:', error)
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-serif text-white mb-2">Manage Privacy Policy</h1>
      <p className="text-white/50 mb-10">Update the content displayed on the public Privacy Policy page.</p>

      {!data && (
        <div className="mb-8 p-4 border border-yellow-500/50 bg-yellow-500/10 text-yellow-400">
          <strong>Warning:</strong> The database table for the Privacy Policy page might not be set up yet. 
          Please run the `supabase_privacy_policy_setup.sql` script in your Supabase SQL Editor first.
        </div>
      )}

      <PrivacyPolicyForm initialData={data || {}} />
    </div>
  )
}
