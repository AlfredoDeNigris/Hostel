CREATE SCHEMA IF NOT EXISTS hostel DEFAULT CHARACTER SET utf8;
USE hostel;

CREATE TABLE IF NOT EXISTS users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(100) NOT NULL,
  username VARCHAR(25) UNIQUE NOT NULL,
  date_birth DATE NOT NULL,
  password VARCHAR(255) NOT NULL,
  billing_address VARCHAR(100) NOT NULL,
  phone_number VARCHAR(15) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  role ENUM('admin', 'employee', 'client') NOT NULL
);

CREATE TABLE IF NOT EXISTS rooms (
  room_number VARCHAR(10) PRIMARY KEY,
  capacity INT NOT NULL,
  bed_type ENUM('single', 'double') NOT NULL
);

CREATE TABLE IF NOT EXISTS offerings (
  offering_id INT PRIMARY KEY AUTO_INCREMENT,
  offering_name VARCHAR(100) NOT NULL,
  offering_description VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  offering_type ENUM('bed', 'excursion') NOT NULL,
  room_id INT NULL,
  available_quantity INT NOT NULL DEFAULT 0,
  FOREIGN KEY (room_id) REFERENCES rooms(room_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS reservations (
  reservation_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  reservation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  check_in DATE NOT NULL,
  check_out DATE NULL,
  status ENUM('pending', 'confirmed', 'canceled', 'completed') NOT NULL DEFAULT 'pending',
  total_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  paid BOOLEAN NOT NULL DEFAULT false,
  promotion_id INT NULL,
  FOREIGN KEY (user_id) REFERENCES users (user_id),
  FOREIGN KEY (promotion_id) REFERENCES promotions (promotion_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS reservation_offerings (
  reservation_id INT NOT NULL,
  offering_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  price_at_booking DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (reservation_id, offering_id),
  FOREIGN KEY (reservation_id) REFERENCES reservations (reservation_id) ON DELETE CASCADE,
  FOREIGN KEY (offering_id) REFERENCES offerings (offering_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS promotions (
  promotion_id INT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(20) UNIQUE NOT NULL,
  description VARCHAR(255),
  discount_percentage DECIMAL(5,2) CHECK (discount_percentage BETWEEN 0 AND 100),
  valid_from DATE NOT NULL,
  valid_until DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS payments (
  payment_id INT PRIMARY KEY AUTO_INCREMENT,
  reservation_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_method ENUM('credit_card', 'debit_card', 'paypal', 'cash') NOT NULL,
  payment_status ENUM('pending', 'completed', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (reservation_id) REFERENCES reservations (reservation_id) ON DELETE CASCADE
);




INSERT INTO user (full_name, username, date_birth, password, billing_address, phone_number, email, role)
VALUES ('John Admin', 'johnA', '1985-05-15', '$2a$12$GSFPHUaic0oxZyMB8zvOZuo5nO231rd4ecCj04hr5DOaxS7t9lBxW', '1234 Elm Street', '555-1234', 'johnAdmin@example.com', 'admin');



INSERT INTO room (room_number, capacity, bed_type) 
VALUES (101, 2, 'double'),
       (102, 4, 'queen'),
       (103, 1, 'single');