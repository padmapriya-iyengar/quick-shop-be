const connection = require('../root/db_connect')
const logger = require('../root/logger')
const message = require('../root/messages')

//Creating customer table
const dbCustomer = require('../entities/customer')
const customer = dbCustomer(connection)
customer.sync({alter: true}).then(() => {
    logger.info(message.alerts.CUSTOMER_TABLE_CREATION_SUCCESS)
}).catch((err) => setImmediate(() => {logger.error(message.alerts.CUSTOMER_TABLE_CREATION_FAILURE)}))

//Creating product category table
const dbProductCategory = require('../entities/product_category')
const productCategory = dbProductCategory(connection)
const dbProduct = require('../entities/product')
const product = dbProduct(connection)
const dbOrder = require('../entities/order')
const order = dbOrder(connection)
productCategory.sync({alter: true}).then(() => {
    logger.info(message.alerts.PRODUCT_TABLE_CREATION_SUCCESS)
    //Creating product table
    product.belongsTo(productCategory, {
        foreignKey: {
          allowNull: false,
          name: 'CategoryFk'
        },
        targetKey: 'Category'
    })
    productCategory.hasMany(product,{
        foreignKey: {
          allowNull: false,
          name: 'CategoryFk'
        },
        sourceKey: 'Category'
    })
    product.sync({alter: true}).then(() => {
        logger.info(message.alerts.PRODUCT_TABLE_CREATION_SUCCESS)
        //Creating order table
        order.belongsTo(customer, {
            foreignKey: {
              allowNull: false,
              name: 'CustomerFk'
            },
            targetKey: 'DisplayName'
        })
        customer.hasMany(order,{
            foreignKey: {
              allowNull: false,
              name: 'CustomerFk'
            },
            sourceKey: 'DisplayName'
        })
        order.belongsTo(product, {
                foreignKey: {
                  allowNull: false,
                  name: 'ProductFk'
                },
                targetKey: 'Name'
        })
        product.hasMany(order,{
            foreignKey: {
              allowNull: false,
              name: 'ProductFk'
            },
            sourceKey: 'Name'
        })
        order.sync({alter: true}).then(() => {
            logger.info(message.alerts.ORDER_TABLE_CREATION_SUCCESS)
        }).catch((err) => setImmediate(() => {logger.error(message.alerts.ORDER_TABLE_CREATION_FAILURE)}))
    }).catch((err) => setImmediate(() => {logger.error(message.alerts.PRODUCT_TABLE_CREATION_FAILURE)}))
}).catch((err) => setImmediate(() => {logger.error(message.alerts.PRODUCT_TABLE_CREATION_FAILURE)}))

module.exports = {
    customer,
    productCategory,
    product,
    order
}