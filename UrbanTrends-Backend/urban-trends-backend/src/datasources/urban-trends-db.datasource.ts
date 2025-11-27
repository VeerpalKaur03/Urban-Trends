
import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {SequelizeDataSource} from '@loopback/sequelize';
require('dotenv').config();

const config = {
  name: 'urbanTrendsDB',
  connector: 'postgresql',
  sequelizeOptions: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: true,

  },
};

@lifeCycleObserver('datasource')
export class UrbanTrendsDbDataSource
  extends SequelizeDataSource
  implements LifeCycleObserver {

  static dataSourceName = 'urbanTrendsDB';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.urbanTrendsDB', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
