const db = require('./common')

/**
 * get all customers
 * @param {}
 * @async
 * @returns {customer} customer objects
 */
const getAllCustomers = async() => {
    return await db.customer.findAll()
}

/**
 * get active customers
 * @param {}
 * @async
 * @returns {customer} customer objects
 */
const getActiveCustomers = async() => {
    return await db.customer.findAll({where: {Status: 1}})
}

/**
 * get customer by id
 * @param {number} customerId customer's unique id 
 * @async
 * @returns {customer} customer object
 */
const getCustomerById = async(reqParams) => {
    return await db.customer.findAll({where: {Id: reqParams.customerId}})
}

/**
 * create customer
 * @param {customer} data customer object
 * @async
 * @returns {customer} customer object
 */
const createCustomer = async(reqBody) => {
    return await db.customer.create(reqBody.data)
}

/**
 * update customer
 * @param {customer} data customer object
 * @async
 * @returns {customer} customer object
 */
const updateCustomer = async(reqBody, reqParams) => {
    const customerData = reqBody.data
    return await db.customer.update(customerData, {where: {Id: reqParams.customerId}})
}

/**
 * delete customer
 * @param {number} customerId customer's unique id 
 * @async
 * @returns {customer} customer object
 */
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