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

INSERT INTO products (product, department, price, quantity)
VALUES ("Porsche", "Automobile", "95000", 25);
INSERT INTO products (product, department, price, quantity)
VALUES ("Corvette", "Automobile", "65000", 25);
INSERT INTO products (product, department, price, quantity)
VALUES ("Toothbrush", "Oral", "2.50", 105);
INSERT INTO products (product, department, price, quantity)
VALUES ("Pen", "Suplies", "1.99", 100);
INSERT INTO products (product, department, price, quantity)
VALUES ("TV", "Electronics", "850.99", 90);
INSERT INTO products (product, department, price, quantity)
VALUES ("Sofa", "Furniture", "899.99", 5);
INSERT INTO products (product, department, price, quantity)
VALUES ("Table", "Furniture", "450.99", 65);
INSERT INTO products (product, department, price, quantity)
VALUES ("Laptop", "Computers", "1200", 2);
INSERT INTO products (product, department, price, quantity)
VALUES ("Headphones", "Accessories", "49.99", 25);
INSERT INTO products (product, department, price, quantity)
VALUES ("Samsung S9", "Cell", "1200", 5);