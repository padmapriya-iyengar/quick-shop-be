const express = require('express')
const report = express.Router({mergeParams: true})

const reportServ = require('../services/report')

/**
 * GET /report/order
 * @summary load report with order details
 * @description load report with order details
 * @tags report
 * @return {object} 200 - success response - application/json: order objects
 * @return {object} 500 - Bad request response
 */
report.get('/order',(req,res) => {
    reportServ.loadOrders(req.query).then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

/**
 * GET /report/product
 * @summary load report with product details
 * @description load report with product details
 * @tags report
 * @return {object} 200 - success response - application/json: product objects
 * @return {object} 500 - Bad request response
 */
report.get('/product',(req,res) => {
    reportServ.loadProducts(req.query).then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

/**
 * GET /report/customer
 * @summary load report with customer details
 * @description load report with customer details
 * @tags report
 * @return {object} 200 - success response - application/json: customer objects
 * @return {object} 500 - Bad request response
 */
report.get('/customer',(req,res) => {
    reportServ.loadCustomers(req.query).then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

module.exports = report