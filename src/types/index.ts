export type Category = {
  id: string
  name: string
  slug: string
  image: string
  created_at: string
}

export type Product = {
  id: string
  name: string
  slug: string
  description: string
  category_id: string
  category?: Category
  price: number
  image: string
  gallery_images: string[]
  meesho_url: string
  featured: boolean
  trending: boolean
  best_seller: boolean
  specifications: Record<string, string>
  created_at: string
}

export type Testimonial = {
  id: string
  name: string
  review: string
  image: string
  rating: number
  created_at: string
}

export type NewsletterSubscriber = {
  id: string
  email: string
  created_at: string
}

export type Order = {
  id: string
  user_id?: string
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  total_amount: number
  payment_method: string
  payment_id?: string
  shipping_name: string
  shipping_phone: string
  shipping_address: string
  shipping_city: string
  shipping_state: string
  shipping_zip: string
  created_at: string
  order_items?: OrderItem[]
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string
  product?: Product
  quantity: number
  price: number
  created_at: string
}
