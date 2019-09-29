'use strict'
const sequelize = require('sequelize')



let connection = new sequelize('course_registration', 'node', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});



connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = connection;