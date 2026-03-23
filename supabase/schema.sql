create extension if not exists pgcrypto;

create table if not exists public.memories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  memory_date date not null,
  specific_time text,
  location text,
  media_url text not null,
  media_path text not null,
  media_type text not null check (media_type in ('image', 'video')),
  caption text not null,
  content text not null,
  created_at timestamptz not null default now()
);

alter table public.memories enable row level security;

drop policy if exists "Users can view their own memories" on public.memories;
create policy "Users can view their own memories"
on public.memories
for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own memories" on public.memories;
create policy "Users can insert their own memories"
on public.memories
for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own memories" on public.memories;
create policy "Users can update their own memories"
on public.memories
for update
using (auth.uid() = user_id);

drop policy if exists "Users can delete their own memories" on public.memories;
create policy "Users can delete their own memories"
on public.memories
for delete
using (auth.uid() = user_id);
