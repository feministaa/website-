-- Feminista — Razorpay payment tracking
-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query → paste → Run).

alter table public.orders
  add column if not exists razorpay_order_id   text,
  add column if not exists razorpay_payment_id text,
  add column if not exists payment_status       text not null default 'unpaid';
