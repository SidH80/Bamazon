DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

CREATE TABLE products (
    id INT AND_INCREMENT NOT NULL,
    product VARCHAR (255) NOT NULL,
    department VARCHAR (255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quanitity INT (10) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product, department, price, stock_quanitity)
VALUES ("Corvette", 'Automobile', 50000.99, 5),
INSERT INTO products (product, department, price, stock_quanitity)
VALUES ("Porsche", 'Automobile', 50000.99, 5),
INSERT INTO products (product, department, price, stock_quanitity)
VALUES ("Corvette", 'Automobile', 50000.99, 5),
INSERT INTO products (product, department, price, stock_quanitity)
VALUES ("Corvette", 'Automobile', 50000.99, 5),
INSERT INTO products (product, department, price, stock_quanitity)
VALUES ("Corvette", 'Automobile', 50000.99, 5),
INSERT INTO products (product, department, price, stock_quanitity)
VALUES ("Corvette", 'Automobile', 50000.99, 5),
INSERT INTO products (product, department, price, stock_quanitity)
VALUES ("Corvette", 'Automobile', 50000.99, 5),
INSERT INTO products (product, department, price, stock_quanitity)
VALUES ("Corvette", 'Automobile', 50000.99, 5),
INSERT INTO products (product, department, price, stock_quanitity)
VALUES ("Corvette", 'Automobile', 50000.99, 5),
INSERT INTO products (product, department, price, stock_quanitity)
VALUES ("Corvette", 'Automobile', 50000.99, 5),