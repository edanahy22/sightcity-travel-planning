DROP DATABASE IF EXISTS travel_db;
CREATE DATABASE travel_db;
USE travel_db;

CREATE TABLE user (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    email VARCHAR(30),
    password VARCHAR(30)
);

CREATE TABLE trip (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    location VARCHAR(30) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    user_id INT,
        FOREIGN KEY (user_id)
        REFERENCES user(id)
        ON DELETE SET NULL
);

CREATE TABLE hotel (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    hotel_name VARCHAR(30) NOT NULL,
    hotel_address VARCHAR(100) NOT NULL,
    hotel_img VARCHAR(400) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    trip_id INT,
        FOREIGN KEY (trip_id)
        REFERENCES trip(id)
        ON DELETE SET NULL
);

CREATE TABLE thingstodo (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    excursion VARCHAR(30) NOT NULL,
    excursion_date DATE NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    trip_id INT,
        FOREIGN KEY (trip_id)
        REFERENCES trip(id)
        ON DELETE SET NULL
);