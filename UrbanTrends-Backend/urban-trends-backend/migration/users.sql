DROP users IF EXISTS;
CREATE TABLE users(
  id INT PRIMARY KEY,
  name VARHCAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(50) DEFAULT 'customer'
);
INSERT INTO users(name, email, password, role)
VALUES(
    { 'xyz',
    'xyz@sf.com',
    'xyz',
    'customer' },
    { 'abc',
    'abc@sf.com',
    'abc',
    'customer' },
    { 'admin',
    'admin@sf.com',
    'admin',
    'admin' },
  );
SELECT *
FROM users;
