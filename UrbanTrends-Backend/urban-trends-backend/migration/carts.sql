DROP carts IF EXISTS;
CREATE TABLE carts(
  id SERIAL PRIMARY KEY,
  quantity INT NOT NULL,
  userId INT NOT NULL,
  productId INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (productId) REFERENCES products(id)
)
INSERT INTO carts(quantity, userId, productId)
VALUES(
    { 3,
    2,
    101 },
    { 1,
    2,
    103 },
    { 2,
    3,
    102 }
  )
SELECT *
FROM carts;
