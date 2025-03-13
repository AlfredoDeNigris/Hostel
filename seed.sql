CREATE SCHEMA IF NOT EXISTS hostel DEFAULT CHARACTER SET utf8;
USE hostel;

CREATE TABLE IF NOT EXISTS user(
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(100) NOT NULL,
  username VARCHAR (25) UNIQUE NOT NULL,
  date_birth DATE NOT NULL,
  password VARCHAR(255) NOT NULL,
  billing_address VARCHAR(100) NOT NULL,
  phone_number VARCHAR(15) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  role ENUM('admin', 'driver', 'cliente') NOT NULL
);

INSERT INTO user (full_name, username, date_birth, password, billing_address, phone_number, email, role)
VALUES ('John Admin', 'johnA', '1985-05-15', '$2a$12$GSFPHUaic0oxZyMB8zvOZuo5nO231rd4ecCj04hr5DOaxS7t9lBxW', '1234 Elm Street', '555-1234', 'johnAdmin@example.com', 'admin');