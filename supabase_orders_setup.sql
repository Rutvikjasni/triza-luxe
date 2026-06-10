-- TRIZA LUXE E-Commerce Database Schema
-- Run this in your Supabase SQL Editor

-- 1. Create Orders Table
CREATE TABLE public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'PENDING',
    total_amount NUMERIC NOT NULL,
    payment_method TEXT NOT NULL,
    payment_id TEXT,
    shipping_name TEXT NOT NULL,
    shipping_phone TEXT NOT NULL,
    shipping_address TEXT NOT NULL,
    shipping_city TEXT NOT NULL,
    shipping_state TEXT NOT NULL,
    shipping_zip TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Order Items Table
CREATE TABLE public.order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    quantity INTEGER NOT NULL,
    price NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Set up Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (so anyone can checkout without logging in, if desired)
-- Or you can restrict to authenticated users if you require login.
-- Here we allow anon to insert orders since it's a guest checkout.
CREATE POLICY "Allow anon to insert orders"
ON public.orders FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow anon to insert order items"
ON public.order_items FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow admins to view and update all orders
-- Note: Requires an admin check, here we just allow service role
-- (Service role bypasses RLS anyway, so no explicit policy needed for the backend)
