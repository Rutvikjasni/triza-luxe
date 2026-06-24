import { Metadata } from "next";
import { Sidebar } from "@/components/admin/Sidebar";

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
    <div className="min-h-screen bg-zinc-950 text-white flex">
      <Sidebar />
      <div className="flex-1 ml-64 pt-10 pb-12 px-8 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
