const express = require('express')
const product = express.Router({mergeParams: true})

const productServ = require('../services/product')

/**
 * GET /product
 * @summary get product data by id
 * @description get product details by productId as queryparam
 * @tags product
 * @return {object} 200 - success response - application/json: product object
 * @return {object} 500 - Bad request response
 */
product.get('/',(req,res) => {
    productServ.getProductById(req.query).then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

/**
 * GET /product/all
 * @summary get all products
 * @description get all products and their details
 * @tags product
 * @return {object} 200 - success response - application/json: product objects
 * @return {object} 500 - Bad request response
 */
product.get('/all',(req,res) => {
    productServ.getAllProducts().then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

/**
 * GET /product/active
 * @summary get active products
 * @description get all active products and their details
 * @tags product
 * @return {object} 200 - success response - application/json: product objects
 * @return {object} 500 - Bad request response
 */
product.get('/active',(req,res) => {
    productServ.getActiveProducts().then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

/**
 * POST /product
 * @summary create/update/delete product
 * @description create or update the product object by passing the new obj/update obj 
 * and setting the action queryparam to CREATE or UPDATE. 
 * delete the product by passing productId as queryparam and setting the action queryparam to DELETE
 * @tags product
 * @return {object} 200 - success response - application/json: product object
 * @return {object} 500 - Bad request response
 */
product.post('/',(req,res) => {
    if(req.query.action === 'CREATE'){
        productServ.createProduct(req.body).then((rows) => {
            res.status(200).json({DisplayName:rows.toJSON().DisplayName})
        }).catch((err) => setImmediate(()=>{throw err;}))
    } else if(req.query.action === 'UPDATE'){
        productServ.updateProduct(req.body, req.query).then((rows) => {
            res.status(200).json({DisplayName:rows.toJSON().DisplayName})
        }).catch((err) => setImmediate(()=>{throw err;}))
    } else if(req.query.action === 'DELETE'){
        productServ.deleteProduct(req.query).then((rows) => {
            res.status(200).json({DisplayName:rows.toJSON().DisplayName})
        }).catch((err) => setImmediate(()=>{throw err;}))
    } 
    
})

module.exports = product