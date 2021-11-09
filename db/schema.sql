CREATE DATABASE employee_app;

\c employee_app

CREATE TABLE employees(
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email_address TEXT,
    job TEXT
)

CREATE TABLE traits(
    id SERIAL PRIMARY KEY,
    trait TEXT,
    icon TEXT
);

CREATE TABLE emplyee_traits(
    id SERIAL PRIMARY KEY,
    trait_id INT, 
    user_id INT
);

INSERT INTO employees (first_name, last_name, email_address, job) VALUES ('Sophie', 'Townsend', 'sophie@gmail.com', 'jr Full Stack Dev');

INSERT INTO employees (first_name, last_name, email_address, job) VALUES ('Ashley', 'Turnbull', 'ashley@gmail.com', 'Accountant');

INSERT INTO employees (first_name, last_name, email_address, job) VALUES ('Athena', 'Katsogiannis', 'athena@gmail.com', 'Marketing');

INSERT INTO employees (first_name, last_name, email_address, job) VALUES ('Cameron', 'Haddad', 'cam@gmail.com', 'Driller');

UPDATE employees SET first_name=$1, last_name=$2, email_address=$3, job=$4 WHERE id = $5

ALTER TABLE traits
ADD trait_id TEXT;

INSERT INTO traits (trait, icon, trait_id) VALUES ('Coffee lover', 'coffee-cup.png', 'coffee-lover' );

INSERT INTO traits (trait, icon, trait_id) VALUES ('Dog person', 'dog.png', 'dog-person' );