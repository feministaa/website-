-- Feminista — expected delivery date from iThink Logistics tracking
-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query → paste → Run).

alter table public.orders
  add column if not exists expected_delivery text;
