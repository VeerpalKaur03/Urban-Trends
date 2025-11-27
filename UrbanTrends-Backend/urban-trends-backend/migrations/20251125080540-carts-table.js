'use strict';

exports.up = function (db, callback) {
  db.createTable('carts', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    quantity: { type: 'int', notNull: true, defaultValue: 1 },
    user_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'fk_cart_user',
        table: 'users',
        mapping: 'id'
      }
    },
    product_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'fk_cart_product',
        table: 'products',
        mapping: 'id'
      }
    }
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('carts', callback);
};
