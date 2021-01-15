insert into "users" ("username", "hashpassword")
values ('fredCh4', '$argon2i$v=19$m=4096,t=3,p=1$h7icQD/xZr8akZsX+hNA0A$h68atJWyjvunAwNOpSpMfg9sPvoMQ6dKwoh0dJhurWA'),
       ('Jace', '$argon2i$v=19$m=4096,t=3,p=1$smr9Az7+eeiKU/UvqOg+4g$aWUmSZQygMDOljW8FVwnxCJCH9XJgIl3AxIk7ijDcr8'),
       ('AlvinMa', '$argon2i$v=19$m=4096,t=3,p=1$3uwC/8eOGLQwxF8wEySNyQ$Qrv1gMUdS0yJDP+rzC4fiY5TIurC4QLMsitl5BdumTw');

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
       ('1', '6', '23.58', 'surge protector, laptop fan', '2020-03-15'),
       ('2', '1', '500', 'Electric, water, phone bills', '2010-05-16'),
       ('2', '2', '80.41', 'Salmon, bread, water, milk, orange juice, hot dogs', '2010-07-01'),
       ('2', '3', '10', 'knitted gloves', '2010-11-29'),
       ('2', '4', '71.51', 'xbox halo and a controller', '2010-03-27'),
       ('2', '5', '32.22', 'Tooth brushes, floss, mouth wash', '2010-06-25'),
       ('2', '6', '66.12', 'Book shelf', '2010-08-16'),
       ('2', '1', '120.69', 'Athen service, health insurance', '2010-09-05'),
       ('2', '2', '36.97', 'Ham, cheese, lettude, bacon', '2010-09-02'),
       ('2', '3', '59.50', '2 hoodies', '2010-10-10'),
       ('2', '4', '120.59', 'MTG commander decks set', '2010-09-29'),
       ('2', '5', '23.40', 'Soap, shampoo, plates, forks, spoons', '2010-09-13'),
       ('2', '6', '10', 'plywoods', '2010-09-20'),
       ('3', '1', '669.20', 'Internet, phone, gas and water bills', '2018-06-28'),
       ('3', '2', '220.45', 'girls scout cookies', '2018-06-05'),
       ('3', '3', '62.41', '4 t-shirt and 2 shorts', '2018-06-12'),
       ('3', '4', '1000.30', '12 SQ packs', '2018-06-30'),
       ('3', '5', '12', 'band-aids and hand sanitizers', '2018-06-09'),
       ('3', '6', '500', 'display case', '2018-06-09'),
       ('3', '1', '120', 'Gas, electric and water bill', '2018-07-10'),
       ('3', '2', '12', '6 bags of chips', '2018-07-15'),
       ('3', '4', '600', 'ps4 and a steering wheel controller', '2018-07-15'),
       ('3', '6', '24.48', '2 hdmi cables', '2018-07-24');
