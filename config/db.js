import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('pena_guru', 'root', '123qweASDZXC!', {
    host: 'localhost',
    dialect: 'mysql', /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });