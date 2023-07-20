const { DataTypes } = require('sequelize')

/**
 * Product Category
 * @typedef {object} product_category
 * @property {number} Id.required
 * @property {string} Category.required
 * @property {date} CreatedOn
 * @property {string} CreatedBy
 * @property {date} UpdatedOn
 * @property {string} UpdatedBy
 */

module.exports = function(sequelize){
    let product_category = sequelize.define("product_category", {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        Category: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: 'UNIQUE'
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
    return product_category
}