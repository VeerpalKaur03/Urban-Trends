DROP products IF EXISTS;
CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price INT NOT NULL,
  stock INT NOT NULL,
  category VARCHAR(100) NOT NULL,
  image_url VARCHAR(300) NOT NULL
)
INSERT INTO products (
    id,
    name,
    description,
    price,
    stock,
    category,
    image_url
  )
VALUES (
    101,
    'Scarf',
    'Silk scarf with floral print',
    799,
    12,
    'Accessories',
    'http://localhost:3000/images/Accessories/scarf.jpg'
  ),
  (
    102,
    'Kids T-Shirt',
    'Cotton t-shirt for kids',
    499,
    25,
    'Kids',
    'http://localhost:3000/images/Kids/tshirt.jpg'
  ),
  (
    103,
    'Denim Jacket',
    'Stylish blue denim jacket for casual wear',
    1999,
    10,
    'Men',
    'http://localhost:3000/images/Mens/m3.jpg'
  ),
  (
    104,
    'Wrist Watch',
    'Analog wrist watch with leather strap',
    3499,
    10,
    'Accessories',
    'http://localhost:3000/images/Accessories/watch.jpg'
  ),
  (
    105,
    'Handbag',
    'Leather handbag with shoulder strap',
    2499,
    10,
    'Ladies',
    'http://localhost:3000/images/Ladies/handbag.jpg'
  ),
  (
    106,
    'Leather Belt',
    'Brown leather belt',
    699,
    20,
    'Accessories',
    'http://localhost:3000/images/Accessories/belt.jpg'
  ),
  (
    107,
    'Casual T-Shirt',
    'Cotton t-shirt with round neck',
    799,
    25,
    'Men',
    'http://localhost:3000/images/Mens/casualT.jpg'
  ),
  (
    108,
    'Kids Sneakers',
    'Lightweight sneakers for kids',
    1299,
    15,
    'Kids',
    'http://localhost:3000/images/Kids/sneaker.jpg'
  ),
  (
    109,
    'Jeans',
    'Blue slim-fit jeans',
    1599,
    30,
    'Men',
    'http://localhost:3000/images/Mens/jeans.jpg'
  ),
  (
    110,
    'Floral Dress',
    'Summer floral dress',
    1999,
    12,
    'Ladies',
    'http://localhost:3000/images/Ladies/lady1.jpg'
  ),
  (
    111,
    'Sandals',
    'Open toe sandals',
    899,
    20,
    'Ladies',
    'http://localhost:3000/images/Ladies/sandals.jpg'
  ),
  (
    112,
    'Kids Shorts',
    'Comfortable cotton shorts',
    599,
    20,
    'Kids',
    'http://localhost:3000/images/Kids/shorts.jpg'
  ),
  (
    113,
    'Formal Shirt',
    'Slim fit formal shirt',
    1299,
    20,
    'Men',
    'http://localhost:3000/images/Mens/formalShirt.jpg'
  ),
  (
    114,
    'Kids Hoodie',
    'Warm hoodie for winter',
    1099,
    10,
    'Kids',
    'http://localhost:3000/images/Kids/hoodie.jpg'
  ),
  (
    115,
    'Sunglasses',
    'UV protection sunglasses',
    1199,
    15,
    'Accessories',
    'http://localhost:3000/images/Accessories/glasses.jpg'
  ),
  (
    116,
    'Leather Shoes',
    'Brown leather shoes for formal occasions',
    2999,
    15,
    'Men',
    'http://localhost:3000/images/Mens/shoes.jpg'
  ),
  (
    117,
    'Blouse',
    'Chiffon blouse with lace details',
    999,
    18,
    'Ladies',
    'http://localhost:3000/images/Ladies/blouse.jpg'
  ),
  (
    118,
    'Backpack',
    'Stylish backpack for daily use',
    1599,
    18,
    'Accessories',
    'http://localhost:3000/images/Accessories/bagpack.jpg'
  ),
  (
    119,
    'Skirt',
    'Pleated midi skirt',
    1299,
    15,
    'Ladies',
    'http://localhost:3000/images/Ladies/skirt.jpg'
  ),
  (
    120,
    'Kids Cap',
    'Cotton cap with adjustable strap',
    399,
    30,
    'Kids',
    'http://localhost:3000/images/Kids/cap.jpg'
  );
SELECT *
FROM products
