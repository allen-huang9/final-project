insert into "users" ("username", "hashpassword")
values ('someone', '$argon2i$v=19$m=4096,t=3,p=1$h7icQD/xZr8akZsX+hNA0A$h68atJWyjvunAwNOpSpMfg9sPvoMQ6dKwoh0dJhurWA');

insert into "category" ("name")
values ('Bills'), ('Food'), ('Clothes'),('Entertainment'), ('Necissity Items'), ('Others');

insert into "entry" ("userId", "categoryId", "amount", "description", "date")
values ('1', '1', '1165.23', '', '2020-01-05'),
       ('1', '2', '150.75', '', '2020-01-06'),
       ('1', '3', '20', '', '2020-01-07'),
       ('1', '4', '800', '', '2020-01-10'),
       ('1', '5', '100', '', '2020-01-15'),
       ('1', '6', '65.58', '', '2020-01-15'),
       ('1', '1', '1565.23', '', '2020-03-05'),
       ('1', '2', '120.33', '', '2020-03-06'),
       ('1', '3', '50', '', '2020-03-07'),
       ('1', '4', '1200', '', '2020-03-10'),
       ('1', '5', '50', '', '2020-03-15'),
       ('1', '6', '23.58', '', '2020-03-15');
