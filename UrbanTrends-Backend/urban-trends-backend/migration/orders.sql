DROP orders IF EXISTS;
CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  userId INT NOT NULL,
  STATUS VARCHAR(50),
  FOREIGN KEY(userId) REFERENCES users(id)
);
INSERT INTO orders (userId, status)
VALUES (2, 'Pending'),
  (3, 'Delivered'),
  (1, 'Delivered');
SELECT *
FROM orders;
