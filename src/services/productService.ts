import { createClient } from '@/lib/supabase/server'
import { Product, Category } from '@/types'

// Removed MOCK_PRODUCTS to only use real database data

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select(`*, category:categories(*)`)
      .eq('featured', true)
      .limit(4)

    if (error || !data) {
      console.error('Error fetching featured products:', error)
      return []
    }

    return data as Product[]
  } catch (error) {
    console.error('Error in getFeaturedProducts:', error)
    return []
  }
}

export async function getBestSellers(): Promise<Product[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select(`*, category:categories(*)`)
      .eq('best_seller', true)
      .limit(4)

    if (error || !data) {
      console.error('Error fetching best sellers:', error)
      return []
    }

    return data as Product[]
  } catch (error) {
    console.error('Error in getBestSellers:', error)
    return []
  }
}

export async function getTrendingProducts(): Promise<Product[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select(`*, category:categories(*)`)
      .eq('trending', true)
      .limit(4)

    if (error || !data) {
      console.error('Error fetching trending products:', error)
      return []
    }

    return data as Product[]
  } catch (error) {
    console.error('Error in getTrendingProducts:', error)
    return []
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select(`*, category:categories!inner(*)`)
      .eq('category.slug', categorySlug)

    if (error || !data) {
      console.error(`Error fetching products for category ${categorySlug}:`, error)
      return []
    }

    return data as Product[]
  } catch (error) {
    console.error('Error in getProductsByCategory:', error)
    return []
  }
}
