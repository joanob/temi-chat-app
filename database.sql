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

CREATE TABLE IF NOT EXISTS contacts (
    user_id INT,
    contact_id INT,
    relationship TINYINT NOT NULL DEFAULT 2, /* 0 blocked, 1 aproved, 2 pending, 3 rejected */
    requestedDate DATE,
    aprovedDate DATE,
    PRIMARY KEY (user_id, contact_id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (contact_id) REFERENCES users (id)
);