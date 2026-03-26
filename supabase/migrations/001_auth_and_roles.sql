-- ============================================================
-- PIC Command Center — Auth & Roles Migration
-- Step 2: User roles, module access, and RLS policies
-- ============================================================

-- 1. USERS PROFILE TABLE (extends Supabase auth.users)
-- Supabase Auth handles login. This table stores app-level profile data.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  avatar_url text,
  role text not null default 'team_member' check (role in ('super_admin', 'admin', 'team_member', 'client')),
  department text check (department in ('retail', 'bd', 'ecom', 'ops', 'executive', null)),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. MODULE ACCESS TABLE
-- Controls which modules each user can access
create table if not exists public.module_access (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  module text not null check (module in ('moonshot', 'opex', 'bizdev', 'orbit', 'admin')),
  access_level text not null default 'read' check (access_level in ('read', 'write', 'admin')),
  granted_by uuid references public.profiles(id),
  granted_at timestamptz not null default now(),
  unique(user_id, module)
);

-- 3. ACTIVITY LOG (global audit trail)
create table if not exists public.activity_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id),
  module text,
  action text not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb default '{}',
  created_at timestamptz not null default now()
);

-- 4. NOTIFICATIONS TABLE
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  body text,
  module text,
  link text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================================
-- ROW-LEVEL SECURITY POLICIES
-- ============================================================

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.module_access enable row level security;
alter table public.activity_log enable row level security;
alter table public.notifications enable row level security;

-- PROFILES: Users can read all profiles, but only update their own
-- Super admins can update anyone
create policy "Anyone can view profiles"
  on public.profiles for select
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Super admins can update any profile"
  on public.profiles for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'super_admin'
    )
  );

create policy "Super admins can insert profiles"
  on public.profiles for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'super_admin'
    )
  );

-- MODULE ACCESS: Users can see their own access. Admins can manage all.
create policy "Users can view own module access"
  on public.module_access for select
  using (user_id = auth.uid());

create policy "Super admins can view all module access"
  on public.module_access for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'super_admin'
    )
  );

create policy "Super admins can manage module access"
  on public.module_access for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'super_admin'
    )
  );

-- ACTIVITY LOG: Users can view logs for their modules
create policy "Users can view activity logs"
  on public.activity_log for select
  using (true);

create policy "Authenticated users can insert logs"
  on public.activity_log for insert
  with check (auth.uid() is not null);

-- NOTIFICATIONS: Users can only see and update their own
create policy "Users can view own notifications"
  on public.notifications for select
  using (user_id = auth.uid());

create policy "Users can update own notifications"
  on public.notifications for update
  using (user_id = auth.uid());

create policy "System can insert notifications"
  on public.notifications for insert
  with check (auth.uid() is not null);

-- ============================================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- ============================================================
-- When a new user signs up via Supabase Auth, auto-create their profile

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', 'New User'),
    new.email
  );
  return new;
end;
$$;

-- Trigger on auth.users insert
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
create or replace function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at();

-- ============================================================
-- INDEXES
-- ============================================================
create index if not exists idx_module_access_user on public.module_access(user_id);
create index if not exists idx_module_access_module on public.module_access(module);
create index if not exists idx_activity_log_user on public.activity_log(user_id);
create index if not exists idx_activity_log_created on public.activity_log(created_at desc);
create index if not exists idx_notifications_user on public.notifications(user_id);
create index if not exists idx_notifications_unread on public.notifications(user_id) where read = false;
