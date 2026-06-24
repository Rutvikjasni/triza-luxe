import React from 'react'

export default function AdminContactPage() {
  // Currently showing a blank table as requested
  const contacts: any[] = []

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-serif text-white">Contact Inquiries</h1>
          <p className="text-white/50 mt-2">Manage messages from customers.</p>
        </div>
      </div>

      <div className="bg-white/5 border border-gold/10 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white/70">
            <thead className="bg-black/50 text-xs uppercase tracking-widest text-gold border-b border-gold/20">
              <tr>
                <th className="px-6 py-4">First Name</th>
                <th className="px-6 py-4">Contact Number</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-white/50">
                    No contact messages found.
                  </td>
                </tr>
              ) : (
                contacts.map((contact, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                    {/* Data will go here when connected */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
