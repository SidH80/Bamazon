DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    id INT AUTO_INCREMENT NOT NULL,
    product VARCHAR (255) NOT NULL,
    department VARCHAR (255) NOT NULL,
    price DECIMAL(10,3) NOT NULL,
    quantity INT(10) NOT NULL,
    PRIMARY KEY (id)
);

use bamazon_db;

insert into inventory (product, department, price, quantity)
values("widget", "Supplies", .99, 100);

insert into inventory (product, department, price, quantity)
values("Steinway", "Instruments", 30000, 10);

insert into inventory (product, department, price, quantity)
values("Porsche", "Automobile", 81000, 10);

insert into inventory (product, department, price, quantity)
values("Corvette", "Automobile", 65095, 15);

insert into inventory (product, department, price, quantity)
values("Pen", "Supplies", 2.99, 100);

insert into inventory (product, department, price, quantity)
values("Selmer", "Instruments", 3295.99, 20);

insert into inventory (product, department, price, quantity)
values("Laptop", "Computer", 1500, 40);

insert into inventory (product, department, price, quantity)
values("Headphones", "Accessories", 45, 75);

insert into inventory (product, department, price, quantity)
values("Perfume", "Fragrances", 55.99, 35);

insert into inventory (product, department, price, quantity)
values("Jeans", "Clothing", 120.99, 11);

insert into inventory (product, department, price, quantity)
values("Pumps", "Shoes", 199.99, 22);
