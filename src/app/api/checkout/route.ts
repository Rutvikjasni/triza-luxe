import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase admin client to bypass RLS for inserting orders
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY! || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // fallback if service key not set
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_fallback',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret_fallback',
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { items, shipping, amount } = body

    // 1. Create order in Supabase (Status: PENDING)
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        total_amount: amount,
        payment_method: 'RAZORPAY',
        status: 'PENDING',
        shipping_name: shipping.name,
        shipping_phone: shipping.phone,
        shipping_address: shipping.address,
        shipping_city: shipping.city,
        shipping_state: shipping.state,
        shipping_zip: shipping.zip,
      })
      .select('id')
      .single()

    if (orderError) {
      console.error('Supabase Order Error:', orderError)
      return NextResponse.json({ error: 'Failed to create order in database' }, { status: 500 })
    }

    // Insert Order Items
    const orderItems = items.map((item: any) => ({
      order_id: orderData.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }))

    const { error: itemsError } = await supabase.from('order_items').insert(orderItems)
    if (itemsError) {
      console.error('Supabase Order Items Error:', itemsError)
    }

    // 2. Create Razorpay Order
    let rzpOrder = { id: `demo_order_${orderData.id.substring(0, 8)}`, amount: amount * 100, currency: 'INR' };
    
    try {
      if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_ID !== 'rzp_test_fallback') {
        rzpOrder = await razorpay.orders.create({
          amount: Math.round(amount * 100), // Amount in paise
          currency: 'INR',
          receipt: `receipt_${orderData.id.substring(0, 8)}`,
          notes: {
            supabaseOrderId: orderData.id,
          },
        })
      } else {
        console.warn("Razorpay keys missing. Using demo order fallback.")
      }
    } catch (rzpError) {
      console.warn("Razorpay API Error (Using Demo Fallback):", rzpError)
    }

    return NextResponse.json({
      success: true,
      razorpayOrder: rzpOrder,
      supabaseOrderId: orderData.id,
    })

  } catch (error: any) {
    console.error('Checkout API Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
