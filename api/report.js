const express = require('express')
const report = express.Router({mergeParams: true})

const reportServ = require('../services/report')

report.get('/order',(req,res) => {
    reportServ.loadOrders(req.query).then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

report.get('/product',(req,res) => {
    reportServ.loadProducts(req.query).then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

report.get('/customer',(req,res) => {
    reportServ.loadCustomers(req.query).then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

module.exports = report