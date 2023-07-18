const express = require('express')
const customer = express.Router({mergeParams: true})

const customerServ = require('../services/customer')

customer.get('/',(req,res) => {
    customerServ.getCustomerById(req.query).then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

customer.get('/all',(req,res) => {
    customerServ.getAllCustomers().then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

customer.get('/active',(req,res) => {
    customerServ.getActiveCustomers().then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

customer.post('/',(req,res) => {
    if(req.query.action === 'CREATE'){
        customerServ.createCustomer(req.body).then((rows) => {
            res.status(200).json({DisplayName:rows.toJSON().DisplayName})
        }).catch((err) => setImmediate(()=>{throw err;}))
    } else if(req.query.action === 'UPDATE'){
        customerServ.updateCustomer(req.body, req.query).then((rows) => {
            res.status(200).json({DisplayName:rows.toJSON().DisplayName})
        }).catch((err) => setImmediate(()=>{throw err;}))
    } else if(req.query.action === 'DELETE'){
        customerServ.deleteCustomer(req.query).then((rows) => {
            res.status(200).json({DisplayName:rows.toJSON().DisplayName})
        }).catch((err) => setImmediate(()=>{throw err;}))
    }
    
})

module.exports = customer