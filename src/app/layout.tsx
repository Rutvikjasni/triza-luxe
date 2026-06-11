import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/common/FloatingWhatsApp";
import { LiquidBackground } from "@/components/ui-custom/LiquidBackground";
import { CartProvider } from "@/store/CartContext";
import { CartDrawer } from "@/components/layout/CartDrawer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TRIZA LUXE | Premium Imitation Jewelry",
    template: "%s | TRIZA LUXE"
  },
  description: "Discover our premium collection of luxury imitation jewelry. Elegance and excellence without compromise.",
  keywords: ["imitation jewelry", "luxury jewelry", "premium fashion", "necklaces", "earrings", "TRIZA LUXE"],
  openGraph: {
    title: "TRIZA LUXE | Premium Imitation Jewelry",
    description: "Discover our premium collection of luxury imitation jewelry. Elegance and excellence without compromise.",
    url: "https://trizaluxe.com",
    siteName: "TRIZA LUXE",
    images: [
      {
        url: "/hero-jewelry.png",
        width: 1200,
        height: 630,
      }
    ],
    locale: "en_IN",
    type: "website",
  },
  verification: {
    google: "0y3pc4rivnJ4Ounjt63T-NDVt_TLz2aYXITpd5hq-58",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} dark antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-black text-white selection:bg-gold selection:text-black">
        <CartProvider>
          <LiquidBackground />
          <Header />
          <CartDrawer />
          <main className="flex-1 relative z-10">
            {children}
          </main>
          <Footer />
          <FloatingWhatsApp />
        </CartProvider>
      </body>
    </html>
  );
}

