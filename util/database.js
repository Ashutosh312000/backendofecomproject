// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node-complete2', 'root', 'Ashutosh$123', {
//   dialect: 'mysql',
//   host: 'localhost'
// });node-complete2

// module.exports = sequelize;

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOST
});

module.exports = sequelize;

