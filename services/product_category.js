const db = require('./common')

const getAllPCategories = async() => {
    return await db.productCategory.findAll()
}

const getActivePCategories = async() => {
    return await db.productCategory.findAll({where: {Status: 1}})
}

const getPCategoryById = async(reqParams) => {
    return await db.productCategory.findAll({where: {Id: reqParams.categoryId}})
}

const createPCategory = async(reqBody) => {
    return await db.productCategory.create(reqBody.data)
}

const updatePCategory = async(reqBody, reqParams) => {
    const categoryData = reqBody.data
    return await db.productCategory.update(categoryData, {where: {Id: reqParams.categoryId}})
}

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