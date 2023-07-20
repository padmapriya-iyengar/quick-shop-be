const express = require('express')
const productCategory = express.Router({mergeParams: true})

const pCategoryServ = require('../services/product_category')

/**
 * GET /product-category
 * @summary get product category data by id
 * @description get product category details by categoryId as queryparam
 * @tags product-category
 * @return {object} 200 - success response - application/json: product category object
 * @return {object} 500 - Bad request response
 */
productCategory.get('/',(req,res) => {
    pCategoryServ.getPCategoryById(req.query).then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

/**
 * GET /product-category/all
 * @summary get all product categories
 * @description get all product categories and their details
 * @tags product-category
 * @return {object} 200 - success response - application/json: product category objects
 * @return {object} 500 - Bad request response
 */
productCategory.get('/all',(req,res) => {
    pCategoryServ.getAllPCategories().then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

/**
 * GET /product-category/active
 * @summary get active product categories
 * @description get all active product categories and their details
 * @tags product-category
 * @return {object} 200 - success response - application/json: product category objects
 * @return {object} 500 - Bad request response
 */
productCategory.get('/active',(req,res) => {
    pCategoryServ.getActivePCategories().then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

/**
 * POST /product-category
 * @summary create/update/delete product category
 * @description create or update the product category object by passing the new obj/update obj 
 * and setting the action queryparam to CREATE or UPDATE. 
 * delete the product category by cpassing ategoryId as queryparam and setting the action queryparam to DELETE
 * @tags product-category
 * @return {object} 200 - success response - application/json: product category object
 * @return {object} 500 - Bad request response
 */
productCategory.post('/',(req,res) => {
    if(req.query.action === 'CREATE'){
        pCategoryServ.createPCategory(req.body).then((rows) => {
            res.status(200).json({DisplayName:rows.toJSON().DisplayName})
        }).catch((err) => setImmediate(()=>{throw err;}))
    } else if(req.query.action === 'UPDATE'){
        pCategoryServ.updatePCategory(req.body, req.query).then((rows) => {
            res.status(200).json({DisplayName:rows.toJSON().DisplayName})
        }).catch((err) => setImmediate(()=>{throw err;}))
    } else if(req.query.action === 'DELETE'){
        pCategoryServ.deletePCategory(req.query).then((rows) => {
            res.status(200).json({DisplayName:rows.toJSON().DisplayName})
        }).catch((err) => setImmediate(()=>{throw err;}))
    } 
})

module.exports = productCategory