

This is a basic hotel management system implemented in postgres. 
Below are a few commands to setup the db.
You will have to replace the secretKey in configFile fot proper encryption of jwt token.
To start the app in dev mode use
   * npm run dev

To run in prod mode use
   * npm run build
   * npm start

Default port is 7557



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
   id serial PRIMARY KEY,
   mid INTEGER REFERENCES patient(mid),
   createdAt TIMESTAMP,
   updatedAt TIMESTAMP,
   prescription TEXT[],
   prescription_approved BOOLEAN DEFAULT false,
   delivered BOOLEAN DEFAULT false
);


CREATE TABLE roles(
   id serial PRIMARY KEY,
   role VARCHAR (50) NOT NULL
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

