import { Hero } from "@/components/home/Hero";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { Newsletter } from "@/components/home/Newsletter";
import { getFeaturedProducts } from '@/services/productService'

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FeaturedCollection products={featuredProducts} />
      <CustomerReviews />
      <Newsletter />
    </div>
  );
}
