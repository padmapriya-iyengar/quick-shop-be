const db = require('./common')

const getAllOrders = async() => {
    return await db.order.findAll()
}

const getActiveOrders = async() => {
    return await db.order.findAll({where: {Status: 1}})
}

const getAllOrdersForCustomer = async(reqParams) => {
    return await db.order.findAll({where: {CustomerFk: reqParams.customerId}})
}

const getActiveOrdersForCustomer = async(reqParams) => {
    return await db.order.findAll({where: {Status: 1, CustomerFk: reqParams.customerId}})
}

const getAllOrdersForProduct = async(reqParams) => {
    return await db.order.findAll({where: {ProductFk: reqParams.productId}})
}

const getActiveOrdersForProduct = async(reqParams) => {
    return await db.order.findAll({where: {Status: 1, ProductFk: reqParams.productId}})
}

const getOrderById = async(reqParams) => {
    return await db.order.findAll({where: {Id: reqParams.orderId}})
}

const getOrderByOrderId = async(reqParams) => {
    return await db.order.findAll({where: {OrderId: reqParams.orderId}})
}

const createOrder = async(reqBody) => {
    return await db.order.create(reqBody.data)
}

const updateOrder = async(reqBody, reqParams) => {
    const orderData = reqBody.data
    return await db.order.update(orderData, {where: {Id: reqParams.orderId}})
}

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