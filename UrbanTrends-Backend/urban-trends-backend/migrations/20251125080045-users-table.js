'use strict';

exports.up = function (db, callback) {
  db.createTable('users', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    name: { type: 'string', notNull: true },
    email: { type: 'string', notNull: true },
    password: { type: 'string', notNull: true },
    role: { type: 'string', defaultValue: 'customer' }
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('users', callback);
};
