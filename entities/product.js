const { DataTypes } = require('sequelize')

/**
 * Product
 * @typedef {object} product
 * @property {number} Id.required
 * @property {string} Name.required
 * @property {decimal} Price.required
 * @property {number} Status.required
 * @property {date} CreatedOn
 * @property {string} CreatedBy
 * @property {date} UpdatedOn
 * @property {string} UpdatedBy
 */

module.exports = function(sequelize){
    let product = sequelize.define("product", {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        Name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: 'UNIQUE'
        },
        Price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            default: 0.00
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
    return product
}