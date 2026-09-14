-- Feminista — iThink Logistics shipment tracking
-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query → paste → Run).

alter table public.orders
  add column if not exists awb_number      text,
  add column if not exists courier_name    text,
  add column if not exists shipment_status text not null default 'not_shipped';
