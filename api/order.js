const express = require('express')
const order = express.Router({mergeParams: true})

const orderServ = require('../services/order')

order.get('/',(req,res) => {
    orderServ.getOrderById(req.query).then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

order.get('/order-id',(req,res) => {
    orderServ.getOrderByOrderId(req.query).then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

order.get('/all',(req,res) => {
    orderServ.getAllOrders().then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

order.get('/active',(req,res) => {
    orderServ.getActiveOrders().then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

order.get('/product',(req,res) => {
    orderServ.getActiveOrdersForProduct(req.query).then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

order.get('/active/product',(req,res) => {
    orderServ.getActiveOrdersForProduct(req.query).then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

order.get('/customer',(req,res) => {
    orderServ.getActiveOrdersForCustomer(req.query).then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

order.get('/active/customer',(req,res) => {
    orderServ.getActiveOrdersForCustomer(req.query).then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

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