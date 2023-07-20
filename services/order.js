const db = require('./common')

/**
 * get all orders
 * @param {}
 * @async
 * @returns {order} order objects
 */
const getAllOrders = async() => {
    return await db.order.findAll()
}

/**
 * get active orders
 * @param {}
 * @async
 * @returns {order} order objects
 */
const getActiveOrders = async() => {
    return await db.order.findAll({where: {Status: 1}})
}

/**
 * get all orders for customer
 * @param {number} customerId customer's unique id 
 * @async
 * @returns {order} order objects
 */
const getAllOrdersForCustomer = async(reqParams) => {
    return await db.order.findAll({where: {CustomerFk: reqParams.customerId}})
}

/**
 * get active orders for customer
 * @param {number} customerId customer's unique id 
 * @async
 * @returns {order} order objects
 */
const getActiveOrdersForCustomer = async(reqParams) => {
    return await db.order.findAll({where: {Status: 1, CustomerFk: reqParams.customerId}})
}

/**
 * get all orders for product
 * @param {number}  productId product's unique id 
 * @async
 * @returns {order} order objects
 */
const getAllOrdersForProduct = async(reqParams) => {
    return await db.order.findAll({where: {ProductFk: reqParams.productId}})
}

/**
 * get active orders for product
 * @param {number}  productId product's unique id 
 * @async
 * @returns {order} order objects
 */
const getActiveOrdersForProduct = async(reqParams) => {
    return await db.order.findAll({where: {Status: 1, ProductFk: reqParams.productId}})
}

/**
 * get order by id
 * @param {number} orderId order's unique id 
 * @async
 * @returns {order} order object
 */
const getOrderById = async(reqParams) => {
    return await db.order.findAll({where: {Id: reqParams.orderId}})
}

/**
 * get order by orderid
 * @param {number} orderId order's unique id 
 * @async
 * @returns {order} order object
 */
const getOrderByOrderId = async(reqParams) => {
    return await db.order.findAll({where: {OrderId: reqParams.orderId}})
}

/**
 * create order
 * @param {order} data order object
 * @async
 * @returns {order} order object
 */
const createOrder = async(reqBody) => {
    return await db.order.create(reqBody.data)
}

/**
 * update order
 * @param {order} data order object
 * @async
 * @returns {order} order object
 */
const updateOrder = async(reqBody, reqParams) => {
    const orderData = reqBody.data
    return await db.order.update(orderData, {where: {Id: reqParams.orderId}})
}

/**
 * delete order
 * @param {number} orderId order's unique id 
 * @async
 * @returns {order} order object
 */
const deleteOrder = async(reqParams) => {
    return await db.order.update({Status: 0}, {where: {Id: reqParams.orderId}})
}

module.exports = {
    getAllOrders,
    getActiveOrders,
    getAllOrdersForCustomer,
    getActiveOrdersForCustomer,
    getAllOrdersForProduct,
    getActiveOrdersForProduct,
    getOrderById,
    getOrderByOrderId,
    createOrder,
    updateOrder,
    deleteOrder
}