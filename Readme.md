docker exec -it hospitalmanagementsystem_db_1 psql -U postgres

\l
CREATE DATABASE hotel_management;
\c hotel_management

CREATE TABLE patient(
   mid serial PRIMARY KEY,
   fullname VARCHAR (100) NOT NULL,
   age INT NOT NULL, 
   mobile BIGINT CHECK (mobile >= 0000000000 AND mobile <= 9999999999),
   email VARCHAR (200) ,
   createdAt TIMESTAMP ,
   updatedAt TIMESTAMP,
);

CREATE TABLE prescriptions(
   mid INTEGER REFERENCES patient(mid),
   createdAt TIMESTAMP PRIMARY KEY,
   updatedAt TIMESTAMP,
   prescription TEXT[],
   prescription_approved BOOLEAN DEFAULT false,
   delivered BOOLEAN DEFAULT false
);


CREATE TABLE roles(
   id serial PRIMARY KEY,
   role VARCHAR (50) NOT NULL
);


CREATE TABLE employee(
   id serial PRIMARY KEY,
   fullname VARCHAR (100) NOT NULL,
   age INT NOT NULL, 
   mobile BIGINT CHECK (mobile >= 0000000000 AND mobile <= 9999999999),
   email VARCHAR (200),
   role INT REFERENCES roles(id)
);

CREATE TABLE users (
   username TEXT PRIMARY KEY,
   password TEXT NOT NULL,
   fullname VARCHAR (100) NOT NULL,
   age INT NOT NULL, 
   mobile BIGINT CHECK (mobile >= 0000000000 AND mobile <= 9999999999),
   email VARCHAR (200),
   role TEXT NOT NULL
);

INSERT INTO roles(role) VALUES ('nurse'), ('doctor'), ('pharmacist'), ('admin');


INSERT INTO employee(fullname, age, mobile, email, role) VALUES ('Mary Kom', 24, 1234567890, 'mary@h.com', 1), ('Madhukar hello', 34, 2345678901, 'madhukar@h.com', 2), ('Abc', 44, 3456789012, 'abc@h.com', 3), ('Admin', 44, 3456789012, 'abc@h.com', 4);

