import { createClient } from '@/lib/supabase/server'
import { Product, Category } from '@/types'

// Mock data for fallback when Supabase is empty
const MOCK_PRODUCTS: Product[] = [
  {
    id: 'm1',
    name: 'Elegant Butterfly Mangalsutra',
    slug: 'elegant-butterfly-mangalsutra',
    description: 'A delicate and elegant butterfly design mangalsutra with premium black beads and gold finish.',
    category_id: 'cat-mangal',
    price: 1999,
    image: '/products/mangalsutra-1-clean.png',
    gallery_images: [],
    meesho_url: 'https://meesho.com',
    featured: true,
    trending: true,
    best_seller: true,
    specifications: {},
    created_at: new Date().toISOString(),
    category: { id: 'cat-mangal', name: 'Mangalsutra', slug: 'mangalsutra', image: '', created_at: '' }
  },
  {
    id: 'm2',
    name: 'Classic Crescent Mangalsutra',
    slug: 'classic-crescent-mangalsutra',
    description: 'A classic crescent moon inspired mangalsutra design with sparkling stones.',
    category_id: 'cat-mangal',
    price: 2199,
    image: '/products/mangalsutra-2-clean.png',
    gallery_images: [],
    meesho_url: 'https://meesho.com',
    featured: true,
    trending: true,
    best_seller: true,
    specifications: {},
    created_at: new Date().toISOString(),
    category: { id: 'cat-mangal', name: 'Mangalsutra', slug: 'mangalsutra', image: '', created_at: '' }
  },
  {
    id: 'm3',
    name: 'Royal Floral Mangalsutra',
    slug: 'royal-floral-mangalsutra',
    description: 'Beautiful floral motif mangalsutra crafted for luxury everyday wear.',
    category_id: 'cat-mangal',
    price: 2499,
    image: '/products/mangalsutra-3-clean.png',
    gallery_images: [],
    meesho_url: 'https://meesho.com',
    featured: true,
    trending: false,
    best_seller: true,
    specifications: {},
    created_at: new Date().toISOString(),
    category: { id: 'cat-mangal', name: 'Mangalsutra', slug: 'mangalsutra', image: '', created_at: '' }
  },
  {
    id: 'm4',
    name: 'Modern Curve Mangalsutra',
    slug: 'modern-curve-mangalsutra',
    description: 'A modern, sophisticated curved mangalsutra set with premium American diamonds.',
    category_id: 'cat-mangal',
    price: 2799,
    image: '/products/mangalsutra-4-clean.png',
    gallery_images: [],
    meesho_url: 'https://meesho.com',
    featured: true,
    trending: true,
    best_seller: false,
    specifications: {},
    created_at: new Date().toISOString(),
    category: { id: 'cat-mangal', name: 'Mangalsutra', slug: 'mangalsutra', image: '', created_at: '' }
  }
]

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('your-project')) {
      return MOCK_PRODUCTS.filter(p => p.featured)
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select(`*, category:categories(*)`)
      .eq('featured', true)
      .limit(4)

    if (error || !data || data.length === 0) {
      console.warn('Using mock featured products')
      return MOCK_PRODUCTS.filter(p => p.featured)
    }

    return data as Product[]
  } catch (error) {
    return MOCK_PRODUCTS.filter(p => p.featured)
  }
}

export async function getBestSellers(): Promise<Product[]> {
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('your-project')) {
      return MOCK_PRODUCTS.filter(p => p.best_seller)
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select(`*, category:categories(*)`)
      .eq('best_seller', true)
      .limit(4)

    if (error || !data || data.length === 0) {
      console.warn('Using mock best sellers')
      return MOCK_PRODUCTS.filter(p => p.best_seller)
    }

    return data as Product[]
  } catch (error) {
    return MOCK_PRODUCTS.filter(p => p.best_seller)
  }
}

export async function getTrendingProducts(): Promise<Product[]> {
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('your-project')) {
      return MOCK_PRODUCTS.filter(p => p.trending)
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select(`*, category:categories(*)`)
      .eq('trending', true)
      .limit(4)

    if (error || !data || data.length === 0) {
      console.warn('Using mock trending products')
      return MOCK_PRODUCTS.filter(p => p.trending)
    }

    return data as Product[]
  } catch (error) {
    return MOCK_PRODUCTS.filter(p => p.trending)
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('your-project')) {
      return MOCK_PRODUCTS.filter(p => p.category?.slug === categorySlug)
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select(`*, category:categories!inner(*)`)
      .eq('category.slug', categorySlug)

    if (error || !data || data.length === 0) {
      console.warn(`Using mock category products for ${categorySlug}`)
      return MOCK_PRODUCTS.filter(p => p.category?.slug === categorySlug)
    }

    return data as Product[]
  } catch (error) {
    return MOCK_PRODUCTS.filter(p => p.category?.slug === categorySlug)
  }
}
