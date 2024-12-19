-- Create categories table
create table public.categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create nominees table
create table public.nominees (
  id uuid default gen_random_uuid() primary key,
  category_id uuid references public.categories(id) on delete cascade,
  name text not null,
  description text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create votes table
create table public.votes (
  id uuid default gen_random_uuid() primary key,
  nominee_id uuid references public.nominees(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.categories enable row level security;
alter table public.nominees enable row level security;
alter table public.votes enable row level security;

-- Create policies
create policy "Enable read access for all users" on public.categories
  for select using (true);

create policy "Enable read access for all users" on public.nominees
  for select using (true);

create policy "Enable insert for authenticated users only" on public.votes
  for insert with check (auth.role() = 'authenticated');

-- Create indexes for better performance
create index nominees_category_id_idx on public.nominees(category_id);
create index votes_nominee_id_idx on public.votes(nominee_id);

-- Create view for vote statistics
create view public.vote_statistics as
select 
  n.id as nominee_id,
  n.name as nominee_name,
  c.id as category_id,
  c.name as category_name,
  count(v.id) as vote_count
from public.nominees n
left join public.votes v on v.nominee_id = n.id
left join public.categories c on c.id = n.category_id
group by n.id, n.name, c.id, c.name;