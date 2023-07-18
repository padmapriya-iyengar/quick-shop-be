const db = require('./common')

const getAllProducts = async() => {
    return await db.product.findAll()
}

const getActiveProducts = async() => {
    return await db.product.findAll({where: {Status: 1}})
}

const getProductById = async(reqParams) => {
    return await db.product.findAll({where: {Id: reqParams.productId}})
}

const createProduct = async(reqBody) => {
    return await db.product.create(reqBody.data)
}

const updateProduct = async(reqBody, reqParams) => {
    const productData = reqBody.data
    return await db.product.update(productData, {where: {Id: reqParams.productId}})
}

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