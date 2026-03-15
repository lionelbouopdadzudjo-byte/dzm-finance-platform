create extension if not exists "uuid-ossp";

create table if not exists owner_account (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text not null unique,
  phone text,
  telegram_chat_id text,
  timezone text not null default 'Africa/Douala',
  created_at timestamptz default now()
);

create table if not exists business_units (
  id uuid primary key default uuid_generate_v4(),
  owner_account_id uuid not null references owner_account(id) on delete cascade,
  code text not null unique,
  name text not null,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists supplier_profile (
  id uuid primary key default uuid_generate_v4(),
  owner_account_id uuid not null references owner_account(id) on delete cascade,
  supplier_code text not null unique default 'DT_AZIMUT',
  supplier_name text not null default 'DT AZIMUT',
  bp text, city text, country text, phone text, email text, website text,
  is_exclusive_supplier boolean default true,
  created_at timestamptz default now(),
  check (supplier_code = 'DT_AZIMUT')
);

create table if not exists profiles (
  id uuid primary key references auth.users(id),
  owner_account_id uuid not null references owner_account(id) on delete cascade,
  full_name text,
  email text,
  role text not null check (role in ('owner','admin','manager','accountant','viewer')),
  default_business_unit_id uuid references business_units(id),
  telegram_chat_id text,
  created_at timestamptz default now()
);

create table if not exists documents (
  id uuid primary key default uuid_generate_v4(),
  owner_account_id uuid not null references owner_account(id),
  business_unit_id uuid references business_units(id),
  uploaded_by uuid not null references profiles(id),
  source text not null check (source in ('web','telegram','api')),
  doc_type text not null check (doc_type in ('invoice','payment_proof','unknown')),
  original_filename text not null,
  mime_type text not null,
  cloudinary_public_id text not null,
  cloudinary_url text not null,
  thumbnail_url text,
  file_hash text,
  perceptual_hash text,
  status text not null check (status in ('uploaded','processing','processed','needs_review','error')),
  ocr_confidence numeric,
  search_text text,
  metadata_json jsonb,
  created_at timestamptz default now()
);

create table if not exists invoices (
  id uuid primary key default uuid_generate_v4(),
  owner_account_id uuid not null references owner_account(id),
  business_unit_id uuid not null references business_units(id),
  document_id uuid not null unique references documents(id),
  supplier_profile_id uuid not null references supplier_profile(id),
  invoice_number text not null,
  supplier_invoice_number_normalized text,
  issue_date date,
  due_date date,
  currency text not null default 'XAF',
  seller_name text,
  customer_display_name text,
  customer_contact_name text,
  customer_phone text,
  subtotal numeric,
  tax_amount numeric,
  tax_rate numeric,
  discount_amount numeric,
  total_amount numeric not null,
  paid_amount numeric not null default 0,
  balance_due numeric not null default 0,
  crate_count integer,
  crates_returned integer,
  cumulative_discount_amount numeric,
  footer_message text,
  status text not null check (status in ('draft','validated','partially_paid','paid','overdue','cancelled','needs_review')),
  search_text text,
  extraction_json jsonb not null,
  reviewed_by uuid references profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists payments (
  id uuid primary key default uuid_generate_v4(),
  owner_account_id uuid not null references owner_account(id),
  business_unit_id uuid not null references business_units(id),
  document_id uuid not null unique references documents(id),
  supplier_profile_id uuid not null references supplier_profile(id),
  reference text,
  beneficiary_name text,
  beneficiary_account text,
  provider text check (provider in ('mtn','orange','bank','cash','other')),
  operation_type text,
  payment_date timestamptz,
  currency text not null default 'XAF',
  amount numeric not null,
  fees_amount numeric,
  transaction_id text,
  balance_after numeric,
  status text not null check (status in ('detected','validated','matched','unmatched','needs_review','partially_allocated','allocated')),
  transactional_text text,
  search_text text,
  extraction_json jsonb not null,
  created_at timestamptz default now()
);

create table if not exists invoice_payment_matches (
  id uuid primary key default uuid_generate_v4(),
  owner_account_id uuid not null references owner_account(id),
  business_unit_id uuid not null references business_units(id),
  invoice_id uuid not null references invoices(id),
  payment_id uuid not null references payments(id),
  match_score numeric not null,
  match_reason jsonb not null,
  allocation_amount numeric,
  status text not null check (status in ('suggested','confirmed','rejected','auto_confirmed','partial_allocation')),
  created_at timestamptz default now(),
  unique(invoice_id, payment_id)
);

create table if not exists anomalies (
  id uuid primary key default uuid_generate_v4(),
  owner_account_id uuid not null references owner_account(id),
  business_unit_id uuid references business_units(id),
  related_type text not null check (related_type in ('invoice','payment','match','document')),
  related_id uuid not null,
  severity text not null check (severity in ('low','medium','high','critical')),
  code text not null,
  message text not null,
  details jsonb,
  status text not null check (status in ('open','acknowledged','resolved')),
  created_at timestamptz default now(),
  resolved_at timestamptz
);

create table if not exists comments (
  id uuid primary key default uuid_generate_v4(),
  owner_account_id uuid not null references owner_account(id),
  business_unit_id uuid references business_units(id),
  entity_type text not null check (entity_type in ('invoice','payment','document')),
  entity_id uuid not null,
  author_id uuid not null references profiles(id),
  content text not null,
  created_at timestamptz default now()
);

create table if not exists activity_logs (
  id uuid primary key default uuid_generate_v4(),
  owner_account_id uuid not null references owner_account(id),
  business_unit_id uuid references business_units(id),
  actor_id uuid,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb,
  created_at timestamptz default now()
);

create table if not exists alerts (
  id uuid primary key default uuid_generate_v4(),
  owner_account_id uuid not null references owner_account(id),
  business_unit_id uuid references business_units(id),
  type text not null,
  title text not null,
  message text not null,
  channel text not null check (channel in ('in_app','telegram','email')),
  status text not null check (status in ('pending','sent','failed','read')),
  recipient_profile_id uuid references profiles(id),
  created_at timestamptz default now()
);

create table if not exists forecast_snapshots (
  id uuid primary key default uuid_generate_v4(),
  owner_account_id uuid not null references owner_account(id),
  business_unit_id uuid references business_units(id),
  kind text not null check (kind in ('cashflow','payments','purchase_suggestion')),
  payload jsonb not null,
  generated_at timestamptz default now()
);

create index if not exists idx_documents_owner_bu on documents(owner_account_id, business_unit_id);
create index if not exists idx_invoices_owner_bu on invoices(owner_account_id, business_unit_id);
create index if not exists idx_payments_owner_bu on payments(owner_account_id, business_unit_id);
create index if not exists idx_anomalies_code on anomalies(code);
create index if not exists idx_invoices_search on invoices using gin (to_tsvector('simple', coalesce(search_text,'')));
create index if not exists idx_payments_search on payments using gin (to_tsvector('simple', coalesce(search_text,'')));
create index if not exists idx_documents_search on documents using gin (to_tsvector('simple', coalesce(search_text,'')));

alter table owner_account enable row level security;
alter table business_units enable row level security;
alter table supplier_profile enable row level security;
alter table profiles enable row level security;
alter table documents enable row level security;
alter table invoices enable row level security;
alter table payments enable row level security;
alter table invoice_payment_matches enable row level security;
alter table anomalies enable row level security;
alter table comments enable row level security;
alter table activity_logs enable row level security;
alter table alerts enable row level security;
alter table forecast_snapshots enable row level security;

create policy owner_isolation_documents on documents using (owner_account_id::text = auth.jwt()->>'owner_account_id');
create policy owner_isolation_invoices on invoices using (owner_account_id::text = auth.jwt()->>'owner_account_id');
create policy owner_isolation_payments on payments using (owner_account_id::text = auth.jwt()->>'owner_account_id');
create policy owner_isolation_matches on invoice_payment_matches using (owner_account_id::text = auth.jwt()->>'owner_account_id');
create policy owner_isolation_anomalies on anomalies using (owner_account_id::text = auth.jwt()->>'owner_account_id');
create policy owner_isolation_alerts on alerts using (owner_account_id::text = auth.jwt()->>'owner_account_id');
