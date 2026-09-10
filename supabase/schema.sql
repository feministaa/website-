-- Feminista — Supabase schema
-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query → paste → Run).

-- ---------------------------------------------------------------------------
-- products
-- ---------------------------------------------------------------------------
create table if not exists public.products (
  id                 text primary key,          -- slug, e.g. "locken"
  slug               text unique not null,
  sku                text,
  name               text not null,
  expression         text,
  family             text not null default 'magnetic',
  tagline            text,
  short_description  text,
  price              integer not null,
  compare_at_price   integer,
  accent             text,
  accent_soft        text,
  sizes              jsonb not null default '[]',   -- [{ label, price }]
  stock              integer not null default 0,
  featured           boolean not null default false,
  coming_soon        boolean not null default false,
  rating             numeric not null default 5,
  reviews            integer not null default 0,
  notes              jsonb not null default '{}',   -- { top: [], heart: [], base: [] }
  overview           jsonb not null default '[]',   -- [{ title, body }]
  how_to_wear        text,
  ingredients        text,
  card_image         text,
  banner_image       text,
  images             jsonb not null default '[]',   -- string[]
  mood_label         text,
  mood_description   text,
  created_at         timestamptz not null default now()
);

alter table public.products enable row level security;

drop policy if exists "products are publicly readable" on public.products;
create policy "products are publicly readable"
  on public.products for select
  using (true);
-- No insert/update/delete policy for anon/authenticated — writes only happen
-- server-side via the service_role key (used in admin API routes), which
-- bypasses RLS entirely.


-- ---------------------------------------------------------------------------
-- customers — CRM-style contact record. Not every row has a login: guest
-- checkouts create a customer row too (auth_user_id stays null until/unless
-- that person later registers with the same email).
-- ---------------------------------------------------------------------------
create table if not exists public.customers (
  id           uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users (id) on delete set null,
  name         text not null,
  email        text not null unique,
  phone        text,
  city         text,
  orders       integer not null default 0,
  total_spent  integer not null default 0,
  status       text not null default 'active',
  joined       timestamptz not null default now()
);

alter table public.customers enable row level security;

drop policy if exists "customers read own row" on public.customers;
create policy "customers read own row"
  on public.customers for select
  using (auth.uid() = auth_user_id);

drop policy if exists "customers update own row" on public.customers;
create policy "customers update own row"
  on public.customers for update
  using (auth.uid() = auth_user_id);

-- Link (or create) a customers row whenever someone signs up via Supabase
-- Auth. If a guest with this email already checked out, adopt that row
-- instead of creating a duplicate.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.customers (auth_user_id, name, email, phone, city)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
    new.email,
    new.raw_user_meta_data ->> 'phone',
    new.raw_user_meta_data ->> 'city'
  )
  on conflict (email) do update
    set auth_user_id = excluded.auth_user_id,
        name = excluded.name,
        phone = coalesce(public.customers.phone, excluded.phone),
        city = coalesce(public.customers.city, excluded.city);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ---------------------------------------------------------------------------
-- orders + order_items
-- ---------------------------------------------------------------------------
create table if not exists public.orders (
  id            text primary key,          -- "FEM-1001"
  customer_id   uuid references public.customers (id) on delete set null,
  customer_name text not null,
  email         text,
  phone         text,
  address       text,
  total         integer not null,
  status        text not null default 'pending',
  created_at    timestamptz not null default now()
);

create table if not exists public.order_items (
  id          uuid primary key default gen_random_uuid(),
  order_id    text not null references public.orders (id) on delete cascade,
  product_id  text references public.products (id) on delete set null,
  size        text,
  qty         integer not null default 1,
  price       integer not null
);

alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "customers read own orders" on public.orders;
create policy "customers read own orders"
  on public.orders for select
  using (
    exists (
      select 1 from public.customers c
      where c.id = orders.customer_id
        and c.auth_user_id = auth.uid()
    )
  );

drop policy if exists "customers read own order items" on public.order_items;
create policy "customers read own order items"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders o
      join public.customers c on c.id = o.customer_id
      where o.id = order_items.order_id
        and c.auth_user_id = auth.uid()
    )
  );
-- No insert/update policy for anon/authenticated — orders are created and
-- updated server-side (via the service_role key) by the /api/orders route,
-- which validates the request before writing.


-- ---------------------------------------------------------------------------
-- Storage — product images
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "product images are publicly readable" on storage.objects;
create policy "product images are publicly readable"
  on storage.objects for select
  using (bucket_id = 'product-images');
-- Uploads happen server-side via the service_role key in the admin upload
-- route, which bypasses RLS — no public insert policy needed.
