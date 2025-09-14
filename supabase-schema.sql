-- Tạo bảng products
create table if not exists products (
  id bigint generated always as identity primary key,
  name text not null,
  category text,
  commission int,
  recurring boolean default false,
  payout text,
  country text,
  monthly_traffic text,
  rating numeric,
  created_at timestamptz default now()
);

-- Tạo bảng hunt (spotlight)
create table if not exists hunt (
  id bigint generated always as identity primary key,
  title text not null,
  highlight text,
  product_id bigint references products(id) on delete set null,
  created_at timestamptz default now()
);

-- Thêm dữ liệu mẫu
insert into products (name, category, commission, recurring, payout, country, monthly_traffic, rating)
values
('SuperShop Affiliate','E-commerce',25,false,'$15 - $120','Global','10k+',4.6),
('CloudScale Partners','SaaS',40,true,'$20 - $250','USA','5k+',4.8),
('HealthPlus Referral','Health',15,false,'$5 - $60','EU','1k+',4.1)
on conflict do nothing;

insert into hunt (title, highlight, product_id)
values (
  'This week: CloudScale Partners',
  'High recurring revenue + 40% commission — ideal for SaaS bloggers',
  (select id from products where name = 'CloudScale Partners')
)
on conflict do nothing;
