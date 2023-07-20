/**
 * root router
 */

const express = require('express')
const quickshop = express.Router()

const productCategoryRouter = require('./product_category')
const productRouter = require('./product')
const customerRouter = require('./customer')
const orderRouter = require('./order')
const reportRouter = require('./report')

quickshop.use('/product-category',productCategoryRouter)
quickshop.use('/product',productRouter)
quickshop.use('/customer',customerRouter)
quickshop.use('/order',orderRouter)
quickshop.use('/report',reportRouter)

module.exports = quickshop