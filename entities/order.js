const { DataTypes } = require('sequelize')

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