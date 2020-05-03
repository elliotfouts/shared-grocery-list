CREATE DATABASE groceries_db;
USE groceries_db;

CREATE TABLE groceries
(
    id INT
    AUTO_INCREMENT,
    PRIMARY KEY
    (id),
    name VARCHAR
    (200) NOT NULL,
    quantity INT DEFAULT 1,
    category VARCHAR
    (200) NOT NULL,
);