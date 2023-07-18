const db = require('./common')

const getAllCustomers = async() => {
    return await db.customer.findAll()
}

const getActiveCustomers = async() => {
    return await db.customer.findAll({where: {Status: 1}})
}

const getCustomerById = async(reqParams) => {
    return await db.customer.findAll({where: {Id: reqParams.customerId}})
}

const createCustomer = async(reqBody) => {
    return await db.customer.create(reqBody.data)
}

const updateCustomer = async(reqBody, reqParams) => {
    const customerData = reqBody.data
    return await db.customer.update(customerData, {where: {Id: reqParams.customerId}})
}

const deleteCustomer = async(reqParams) => {
    return await db.customer.update({Status: 0}, {where: {Id: reqParams.customerId}})
}

module.exports = {
    getAllCustomers,
    getActiveCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
}