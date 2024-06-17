CREATE DATABASE promoter;

USE promoter;

CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE Prospects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    first_surname VARCHAR(50) NOT NULL,
    second_surname VARCHAR(50) NOT NULL,
    street VARCHAR(100) NOT NULL,
    number NUMERIC NOT NULL,
    neighborhood VARCHAR(100) NOT NULL,
    postal_code NUMERIC NOT NULL,
    city VARCHAR(50) NOT NULL,
    phone NUMERIC NOT NULL,
    rfc VARCHAR(20) NOT NULL UNIQUE,
    status VARCHAR(50) NOT NULL DEFAULT 'Enviado',
    observations TEXT,
    attended_by INT REFERENCES Users(id)
);

CREATE TABLE Files (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    path VARCHAR(100) NOT NULL,
    prospect_id INT REFERENCES Users(id)
);
