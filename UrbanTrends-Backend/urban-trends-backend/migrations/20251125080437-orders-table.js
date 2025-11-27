'use strict';

exports.up = function (db, callback) {
  db.createTable('orders', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    status: { type: 'string' },
    user_id: {
      type: 'int',
      foreignKey: {
        name: 'fk_orders_user',
        table: 'users',
        rules: { onDelete: 'CASCADE' },
        mapping: 'id'
      }
    }
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('orders', callback);
};
