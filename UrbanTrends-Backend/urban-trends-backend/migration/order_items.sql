DROP order_items IF EXISTS;
CREATE TABLE order_items(
  id INT PRIMARY KEY,
  priceAtPurchase INT NOT NULL,
  quantity INT NOT NULL,
  productId INT NOT NULL,
  orderId INT NOT NULL,
  FOREIGN KEY(productId) REFERENCES products(id) FOREIGN KEY(orderId) REFERENCES orders(id)
);
INSERT INTO order_items(priceAtPurchase, quantity)
VALUES(
    { 1212,
    3,
    101,
    2 },
    { 8999,
    5,
    107,
    1 },
    { 7999,
    6,
    111,
    8 },
  )
SELECT *
FROM order_items;
