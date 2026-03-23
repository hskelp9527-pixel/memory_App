insert into storage.buckets (id, name, public)
values ('memories-media', 'memories-media', true)
on conflict (id) do nothing;

drop policy if exists "Authenticated users can upload their own media" on storage.objects;
create policy "Authenticated users can upload their own media"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'memories-media'
  and split_part(name, '/', 1) = auth.uid()::text
);

drop policy if exists "Users can view their own uploaded media" on storage.objects;
create policy "Users can view their own uploaded media"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'memories-media'
  and split_part(name, '/', 1) = auth.uid()::text
);
