CREATE DATABASE IF NOT EXISTS cruduitec;

USE cruduitec;

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL
);

INSERT INTO categories (name) VALUES
    ('Aluguel'),
    ('Pagamento'),
    ('Prolabore'),
    ('Investimentos'),
    ('Educação'),
    ('Saúde'),
    ('Lazer'),
    ('Transporte'),
    ('Alimentação'),
    ('Outros');

CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    transaction_type VARCHAR(255) NOT NULL,
    category_id INT,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);