const connection = require('../root/db_connect')
const logger = require('../root/logger')
const message = require('../root/messages')

const dbCustomer = require('../entities/customer')
const customer = dbCustomer(connection)
/**
 * customer table creation
 */
customer.sync({alter: true}).then(() => {
    logger.info(message.alerts.CUSTOMER_TABLE_CREATION_SUCCESS)
}).catch((err) => setImmediate(() => {logger.error(message.alerts.CUSTOMER_TABLE_CREATION_FAILURE)}))

const dbProductCategory = require('../entities/product_category')
const productCategory = dbProductCategory(connection)
const dbProduct = require('../entities/product')
const product = dbProduct(connection)
const dbOrder = require('../entities/order')
const order = dbOrder(connection)
/**
 * product category table creation
 */
productCategory.sync({alter: true}).then(() => {
    logger.info(message.alerts.PRODUCT_TABLE_CREATION_SUCCESS)
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
    /** 
     * product table creation
    */
    product.sync({alter: true}).then(() => {
        logger.info(message.alerts.PRODUCT_TABLE_CREATION_SUCCESS)
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
        /**
         * order table creation
         */
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