'use strict';

exports.up = function (db, callback) {
  db.createTable('order_items', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    price: { type: 'int', notNull: true },
    quantity: { type: 'int', notNull: true },
    product_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'fk_item_product',
        table: 'products',
        mapping: 'id'
      }
    },
    order_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'fk_item_order',
        table: 'orders',
        mapping: 'id'
      }
    }
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('order_items', callback);
};
