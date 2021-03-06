const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_SERVER,
    dialect: 'mysql'
  }
);

sequelize
  .authenticate()
  .then(() => console.log('Connection to database successful'))
  .catch(err => {
    console.log(err);
  });

module.exports = sequelize;
