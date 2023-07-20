const db = require('./common')

/**
 * get all product categories
 * @param {}
 * @async
 * @returns {product_category} product category objects
 */
const getAllPCategories = async() => {
    return await db.productCategory.findAll()
}

/**
 * get active product categories
 * @param {}
 * @async
 * @returns {product_category} product category objects
 */
const getActivePCategories = async() => {
    return await db.productCategory.findAll({where: {Status: 1}})
}

/**
 * get product category by id
 * @param {number} categoryId category's unique id 
 * @async
 * @returns {product_category} product category object
 */
const getPCategoryById = async(reqParams) => {
    return await db.productCategory.findAll({where: {Id: reqParams.categoryId}})
}

/**
 * create product category
 * @param {product_category} data product category object
 * @async
 * @returns {product_category} product category object
 */
const createPCategory = async(reqBody) => {
    return await db.productCategory.create(reqBody.data)
}

/**
 * update product category
 * @param {product_category} data product category object
 * @async
 * @returns {product_category} product category object
 */
const updatePCategory = async(reqBody, reqParams) => {
    const categoryData = reqBody.data
    return await db.productCategory.update(categoryData, {where: {Id: reqParams.categoryId}})
}

/**
 * delete product category
 * @param {number} categoryId category's unique id 
 * @async
 * @returns {product_category} product category object
 */
const deletePCategory = async(reqParams) => {
    return await db.productCategory.update({Status: 0}, {where: {Id: reqParams.categoryId}})
}

module.exports = {
    getAllPCategories,
    getActivePCategories,
    getPCategoryById,
    createPCategory,
    updatePCategory,
    deletePCategory
}