CREATE DATABASE IF NOT EXISTS temi;

USE temi;

SET CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(60) UNIQUE NOT NULL,
    pass varchar(255) NOT NULL,
    profilePic varchar(255),
    profileBio varchar(500),
    signupDate DATE NOT NULL
);