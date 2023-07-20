/**
 * sequelize-db connection
 */

const Sequelize = require('sequelize')
const configuration = require('../config/config')

const sequelize = new Sequelize(
  configuration.db.schema,
  configuration.db.username,
  configuration.db.password,
  {
    host:configuration.db.host,
    dialect:configuration.db.dialect,
    time_zone:configuration.db.timezome,
    logging: configuration.db.logging
  }
)

module.exports = sequelize