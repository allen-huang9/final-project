insert into "users" ("username", "hashpassword")
values ('someone', '$argon2i$v=19$m=4096,t=3,p=1$h7icQD/xZr8akZsX+hNA0A$h68atJWyjvunAwNOpSpMfg9sPvoMQ6dKwoh0dJhurWA');

insert into "category" ("name")
values ('Bills'), ('Food'), ('Clothes'),('Entertainment'), ('Necissity Items'), ('Others');

insert into "entry" ("userId", "categoryId", "amount", "description", "date")
values ('1', '1', '1165.23', 'Paid the water, electricity and phone bill', '2020-01-05'),
       ('1', '2', '150.75', 'Bought chips, orange juice, milk, ham, lettuce', '2020-01-06'),
       ('1', '3', '20', 'Bought a sweater from costco', '2020-01-07'),
       ('1', '4', '800', 'Bought 10 sq packs', '2020-01-10'),
       ('1', '5', '100', 'Bought tooth brushes, laundry detergent, dish soap, gas', '2020-01-15'),
       ('1', '6', '65.58', 'Bought 2 water boilers from costco', '2020-01-15'),
       ('1', '1', '1565.23', 'Paid the internet, phone, water, insurance, and electricity bills', '2020-03-05'),
       ('1', '2', '120.33', 'Bought salmon, dumplings, chicken tenders, pizza', '2020-03-06'),
       ('1', '3', '50', 'Bought underwear, pants, dress shirt, black tie', '2020-03-07'),
       ('1', '4', '1200', 'Bought game currency, ps5, TV', '2020-03-10'),
       ('1', '5', '50', 'Tooth paste, floss, shampoo, paper, pens', '2020-03-15'),
       ('1', '6', '23.58', 'surge protector, laptop fan', '2020-03-15');
