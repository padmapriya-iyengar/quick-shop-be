const db = require('./common')

/**
 * get all products
 * @param {}
 * @async
 * @returns {product} product objects
 */
const getAllProducts = async() => {
    return await db.product.findAll()
}

/**
 * get active products
 * @param {}
 * @async
 * @returns {product} product objects
 */
const getActiveProducts = async() => {
    return await db.product.findAll({where: {Status: 1}})
}

/**
 * get product by id
 * @param {number} productId product's unique id 
 * @async
 * @returns {product} product object
 */
const getProductById = async(reqParams) => {
    return await db.product.findAll({where: {Id: reqParams.productId}})
}

/**
 * create product
 * @param {product} data product object
 * @async
 * @returns {product} product object
 */
const createProduct = async(reqBody) => {
    return await db.product.create(reqBody.data)
}

/**
 * update product
 * @param {product} data product object
 * @async
 * @returns {product} product object
 */
const updateProduct = async(reqBody, reqParams) => {
    const productData = reqBody.data
    return await db.product.update(productData, {where: {Id: reqParams.productId}})
}

/**
 * delete product
 * @param {number} productId product's unique id 
 * @async
 * @returns {product} product object
 */
const deleteProduct = async(reqParams) => {
    return await db.product.update({Status: 0}, {where: {Id: reqParams.productId}})
}

module.exports = {
    getAllProducts,
    getActiveProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}