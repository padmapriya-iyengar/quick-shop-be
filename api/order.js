const express = require('express')
const order = express.Router({mergeParams: true})

const orderServ = require('../services/order')

/**
 * GET /order
 * @summary get order data by id
 * @description get order details by orderId as queryparam
 * @tags order
 * @return {object} 200 - success response - application/json: order object
 * @return {object} 500 - Bad request response
 */
order.get('/',(req,res) => {
    orderServ.getOrderById(req.query).then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

/**
 * GET /order/order-id
 * @summary get order data by orderid
 * @description get order details by orderId as queryparam
 * @tags order
 * @return {object} 200 - success response - application/json: order object
 * @return {object} 500 - Bad request response
 */
order.get('/order-id',(req,res) => {
    orderServ.getOrderByOrderId(req.query).then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

/**
 * GET /order/all
 * @summary get all orders
 * @description get all orders and their details
 * @tags order
 * @return {object} 200 - success response - application/json: order objects
 * @return {object} 500 - Bad request response
 */
order.get('/all',(req,res) => {
    orderServ.getAllOrders().then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

/**
 * GET /order/active
 * @summary get active orders
 * @description get all active orders and their details
 * @tags order
 * @return {object} 200 - success response - application/json: order objects
 * @return {object} 500 - Bad request response
 */
order.get('/active',(req,res) => {
    orderServ.getActiveOrders().then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

/**
 * GET /order/product
 * @summary get all orders by product
 * @description get all orders and their details for the given product
 * @tags order
 * @return {object} 200 - success response - application/json: order objects
 * @return {object} 500 - Bad request response
 */
order.get('/product',(req,res) => {
    orderServ.getActiveOrdersForProduct(req.query).then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

/**
 * GET /order/active/product
 * @summary get active orders by product
 * @description get all active orders and their details for the given product
 * @tags order
 * @return {object} 200 - success response - application/json: order objects
 * @return {object} 500 - Bad request response
 */
order.get('/active/product',(req,res) => {
    orderServ.getActiveOrdersForProduct(req.query).then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

/**
 * GET /order/customer
 * @summary get all orders by customer
 * @description get all orders and their details for the given customer
 * @tags order
 * @return {object} 200 - success response - application/json: order objects
 * @return {object} 500 - Bad request response
 */
order.get('/customer',(req,res) => {
    orderServ.getActiveOrdersForCustomer(req.query).then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

/**
 * GET /order/active/customer
 * @summary get active orders by customer
 * @description get all active orders and their details for the given customer
 * @tags order
 * @return {object} 200 - success response - application/json: order objects
 * @return {object} 500 - Bad request response
 */
order.get('/active/customer',(req,res) => {
    orderServ.getActiveOrdersForCustomer(req.query).then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

/**
 * POST /order
 * @summary create/update/delete order
 * @description create or update the order object by passing the new obj/update obj 
 * and setting the action queryparam to CREATE or UPDATE. 
 * delete the order by passing orderId as queryparam and setting the action queryparam to DELETE
 * @tags order
 * @return {object} 200 - success response - application/json: order object
 * @return {object} 500 - Bad request response
 */
order.post('/',(req,res) => {
    if(req.query.action === 'CREATE'){
        orderServ.createOrder(req.body).then((rows) => {
            res.status(200).json({DisplayName:rows.toJSON().DisplayName})
        }).catch((err) => setImmediate(()=>{throw err;}))
    } else if(req.query.action === 'UPDATE'){
        orderServ.updateOrder(req.body, req.query).then((rows) => {
            res.status(200).json({DisplayName:rows.toJSON().DisplayName})
        }).catch((err) => setImmediate(()=>{throw err;}))
    } else if(req.query.action === 'DELETE'){
        orderServ.deleteOrder(req.query).then((rows) => {
            res.status(200).json({DisplayName:rows.toJSON().DisplayName})
        }).catch((err) => setImmediate(()=>{throw err;}))
    }
    
})

module.exports = order