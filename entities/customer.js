const { DataTypes } = require('sequelize')

/**
 * Customer
 * @typedef {object} customer
 * @property {number} Id.required
 * @property {string} Title
 * @property {string} FirstName.required
 * @property {string} MiddleName
 * @property {string} LastName
 * @property {string} DisplayName.unique
 * @property {string} Email
 * @property {string} Contact
 * @property {number} Status.required
 * @property {date} CreatedOn
 * @property {string} CreatedBy
 * @property {date} UpdatedOn
 * @property {string} UpdatedBy
 */

module.exports = function(sequelize){
    let customer = sequelize.define("customer", {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        Title: {
            type: DataTypes.STRING(10)
        },
        FirstName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        MiddleName: {
            type: DataTypes.STRING(50)
        },
        LastName: {
            type: DataTypes.STRING(50)
        },
        DisplayName: {
            type: DataTypes.STRING(200),
            unique: 'UNIQUE'
        },
        Email: {
            type: DataTypes.STRING(150),
            validate: {isEmail: true}
        },
        Contact: {
            type: DataTypes.STRING(20)
        },
        Status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        CreatedOn: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        CreatedBy: {
            type: DataTypes.STRING(100),
            defaultValue: 'system'
        },
        UpdatedOn: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        UpdatedBy: {
            type: DataTypes.STRING(100),
            defaultValue: 'system'
        }
    },
    {
        timestamps: false
    })
    return customer
}