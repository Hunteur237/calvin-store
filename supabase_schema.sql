-- ============================================================
-- Calvin Telecom — SCHÉMA SUPABASE COMPLET
-- À exécuter dans : Supabase Dashboard > SQL Editor > New query
-- ============================================================

-- Extension pour générer des UUID
create extension if not exists "uuid-ossp";

-- ───────────────────────── CONTACTS (formulaire de contact) ─────────────────────────
create table if not exists contacts (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  company text,
  email text,
  phone text,
  service text,
  subject text,
  budget text,
  message text,
  status text default 'nouveau', -- nouveau | en_cours | traité
  created_at timestamptz default now()
);

-- ───────────────────────── AVIS CLIENTS ─────────────────────────
create table if not exists reviews (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  company text,
  service text,
  note int not null check (note between 1 and 5),
  text text not null,
  avatar text,
  approved boolean default false,
  created_at timestamptz default now()
);

-- ───────────────────────── RENDEZ-VOUS ─────────────────────────
create table if not exists appointments (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text,
  subject text,
  day text,
  slot text,
  status text default 'en_attente', -- en_attente | confirmé | annulé | effectué
  created_at timestamptz default now()
);

-- ───────────────────────── DEVIS ─────────────────────────
create table if not exists quotes (
  id uuid primary key default uuid_generate_v4(),
  name text,
  email text,
  phone text,
  project_type text,
  users_count int,
  options jsonb,
  urgence text,
  estimated_total numeric,
  status text default 'nouveau',
  created_at timestamptz default now()
);

-- ───────────────────────── PRODUITS (boutique) ─────────────────────────
create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  cat text,
  price numeric not null,
  old_price numeric,
  stock int default 0,
  badge text,
  rating numeric default 5,
  reviews int default 0,
  img text,
  description text,
  active boolean default true,
  created_at timestamptz default now()
);

-- ───────────────────────── COMMANDES (boutique) ─────────────────────────
create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  client_name text not null,
  client_phone text,
  client_address text,
  items jsonb not null,       -- snapshot du panier [{id,name,price,qty}, ...]
  total numeric not null,
  status text default 'en_attente', -- en_attente | confirmé | expédié | livré | annulé
  payment_method text default 'mobile_money',
  payment_status text default 'non_requis', -- non_requis | en_attente | payé | échoué
  transaction_id text,
  email text,
  created_at timestamptz default now()
);

-- ───────────────────────── CLIENTS (CRM admin) ─────────────────────────
create table if not exists clients (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  contact text,
  email text,
  phone text,
  secteur text,
  ville text,
  status text default 'Actif',
  created_at timestamptz default now()
);

-- ───────────────────────── INTERVENTIONS (CRM admin) ─────────────────────────
create table if not exists interventions (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid references clients(id) on delete set null,
  client_name text,
  type text,
  date date,
  duree numeric,
  description text,
  montant numeric,
  status text default 'Planifiée',
  created_at timestamptz default now()
);

-- ───────────────────────── FACTURES (CRM admin) ─────────────────────────
create table if not exists invoices (
  id text primary key, -- ex: F-2025-001
  client_id uuid references clients(id) on delete set null,
  client_name text,
  date date,
  echeance date,
  objet text,
  lignes jsonb,
  ht numeric,
  tva numeric,
  ttc numeric,
  status text default 'En attente',
  created_at timestamptz default now()
);

-- ───────────────────────── ARTICLES DE BLOG ─────────────────────────
create table if not exists blog_posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  excerpt text,
  content text,
  cover text,
  category text,
  published boolean default false,
  created_at timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- L'admin de ce site utilise un mot de passe simple côté front
-- (pas de Supabase Auth pour l'instant). Les politiques ci-dessous
-- autorisent donc la clé "anon" à lire/écrire largement, afin que
-- l'admin et les formulaires publics fonctionnent dès aujourd'hui.
-- ⚠️ Recommandé en Phase 2 : brancher Supabase Auth + restreindre
-- ces policies aux utilisateurs authentifiés "admin" uniquement.
-- ============================================================

alter table contacts       enable row level security;
alter table reviews        enable row level security;
alter table appointments   enable row level security;
alter table quotes         enable row level security;
alter table products       enable row level security;
alter table orders         enable row level security;
alter table clients        enable row level security;
alter table interventions  enable row level security;
alter table invoices       enable row level security;
alter table blog_posts     enable row level security;

-- Tout le monde (visiteur) peut créer une demande
create policy "public insert contacts"     on contacts     for insert with check (true);
create policy "public insert reviews"      on reviews      for insert with check (true);
create policy "public insert appointments" on appointments for insert with check (true);
create policy "public insert quotes"       on quotes       for insert with check (true);
create policy "public insert orders"       on orders       for insert with check (true);

-- Lecture publique : uniquement le contenu déjà validé
create policy "public select approved reviews"  on reviews     for select using (approved = true);
create policy "public select active products"   on products    for select using (active = true);
create policy "public select published blog"    on blog_posts  for select using (published = true);

-- Accès large (clé anon) pour le panneau admin — à restreindre quand l'auth admin sera en place
create policy "anon manage contacts"      on contacts      for all using (true) with check (true);
create policy "anon manage reviews"       on reviews       for all using (true) with check (true);
create policy "anon manage appointments"  on appointments  for all using (true) with check (true);
create policy "anon manage quotes"        on quotes        for all using (true) with check (true);
create policy "anon manage products"      on products      for all using (true) with check (true);
create policy "anon manage orders"        on orders        for all using (true) with check (true);
create policy "anon manage clients"       on clients       for all using (true) with check (true);
create policy "anon manage interventions" on interventions for all using (true) with check (true);
create policy "anon manage invoices"      on invoices      for all using (true) with check (true);
create policy "anon manage blog_posts"    on blog_posts    for all using (true) with check (true);

-- ============================================================
-- QUELQUES PRODUITS DE DÉPART (modifiable ensuite depuis l'admin)
-- ============================================================
insert into products (name, cat, price, old_price, stock, badge, rating, reviews, img, description, active) values
('iPhone 15 Pro 256GB',        'Téléphones',        780000, 850000, 6,  'Promo',   4.9, 41, 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=500&h=380&fit=crop&q=80', 'Puce A17 Pro · Écran Super Retina XDR 6.1" · Triple caméra 48MP · 5G', true),
('Samsung Galaxy S24',          'Téléphones',        520000, null,   9,  'Nouveau', 4.7, 19, 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&h=380&fit=crop&q=80', 'Écran Dynamic AMOLED 6.2" · 128GB · Triple caméra 50MP · 5G', true),
('Laptop Dell XPS 15',          'Ordinateurs',       585000, 640000, 4,  'Promo',   4.8, 24, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=380&fit=crop&q=80', 'Intel Core i7-13700H · 32GB DDR5 · 1TB NVMe SSD · OLED 15.6" 3.5K', true),
('MacBook Air M2',              'Ordinateurs',       695000, null,   5,  'Nouveau', 4.9, 33, 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=380&fit=crop&q=80', 'Puce Apple M2 · 8GB RAM · 256GB SSD · Écran Liquid Retina 13.6"', true),
('Écouteurs sans fil Pro',      'Accessoires',       38000,  45000,  22, 'Promo',   4.6, 58, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=380&fit=crop&q=80', 'Réduction de bruit active · Autonomie 24h · Bluetooth 5.3', true),
('Powerbank 20000mAh',          'Accessoires',       22000,  26000,  30, 'Promo',   4.7, 35, 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=380&fit=crop&q=80', '20000mAh · Charge rapide 22.5W · 2 ports USB + 1 USB-C', true),
('Smart TV LED 55" 4K',         'TV',                365000, 410000, 5,  'Promo',   4.8, 22, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&h=380&fit=crop&q=80', '4K UHD · Smart TV Android · HDR10 · 3× HDMI · WiFi intégré', true),
('Smart TV LED 43" Full HD',    'TV',                210000, null,   8,  'Stock',   4.6, 14, 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=500&h=380&fit=crop&q=80', 'Full HD 1080p · Smart TV · 2× HDMI · USB · Netflix & YouTube intégrés', true),
('Montre connectée Sport',      'Gadgets Connectés', 58000,  68000,  16, 'Promo',   4.7, 29, 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500&h=380&fit=crop&q=80', 'Suivi cardiaque · GPS · Étanche 5ATM · Autonomie 10 jours', true),
('Caméra de surveillance WiFi', 'Gadgets Connectés', 32000,  null,   20, 'Nouveau', 4.5, 18, 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=500&h=380&fit=crop&q=80', 'Full HD 1080p · Vision nocturne · Détection de mouvement · App mobile', true)
on conflict do nothing;
