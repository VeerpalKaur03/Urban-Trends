'use strict';

exports.up = function (db, callback) {
  db.createTable('products', {
    id: { type: 'int', primaryKey: true },
    name: { type: 'string', notNull: true },
    description: { type: 'string', notNull: true },
    price: { type: 'int', notNull: true },
    stock: { type: 'int', notNull: true },
    category: { type: 'string', notNull: true },
    image_url: { type: 'string', notNull: true }
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('products', callback);
};
