import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Secure admin panel for TRIZA LUXE",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* 
        Note: You might want to conditionally hide the main site Header/Footer 
        if this layout is nested under the root layout. Since we are using Next.js 15,
        the root layout will wrap this. We can use a custom CSS class to hide global header/footer,
        or better, reorganize root layout, but for simplicity we keep it as is.
      */}
      <div className="pt-24 pb-12">
        {children}
      </div>
    </div>
  );
}
