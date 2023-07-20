const { DataTypes } = require('sequelize')

/**
 * Order
 * @typedef {object} order
 * @property {number} Id.required
 * @property {string} OrderId.required
 * @property {string} PaymentMode.required
 * @property {date} OrderDate.required
 * @property {number} Status.required
 * @property {string} CustomerFk.required
 * @property {string} ProductFk.required
 * @property {date} CreatedOn
 * @property {string} CreatedBy
 * @property {date} UpdatedOn
 * @property {string} UpdatedBy
 */

module.exports = function(sequelize){
    let order = sequelize.define("order", {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        OrderId: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        PaymentMode: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        OrderDate: {
            type: DataTypes.DATE,
            allowNull: false
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
    return order
}