const express = require('express')
const customer = express.Router({mergeParams: true})

const customerServ = require('../services/customer')

/**
 * GET /customer
 * @summary get customer data by id
 * @description get customer details by customerId as queryparam
 * @tags customer
 * @return {object} 200 - success response - application/json: customer object
 * @return {object} 500 - Bad request response
 */
customer.get('/',(req,res) => {
    customerServ.getCustomerById(req.query).then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

/**
 * GET /customer/all
 * @summary get all customers
 * @description get all customers and their details
 * @tags customer
 * @return {object} 200 - success response - application/json: customer objects
 * @return {object} 500 - Bad request response
 */
customer.get('/all',(req,res) => {
    customerServ.getAllCustomers().then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

/**
 * GET /customer/active
 * @summary get active customers
 * @description get all active customers and their details
 * @tags customer
 * @return {object} 200 - success response - application/json: customer objects
 * @return {object} 500 - Bad request response
 */
customer.get('/active',(req,res) => {
    customerServ.getActiveCustomers().then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

/**
 * POST /customer
 * @summary create/update/delete customer
 * @description create or update the customer object by passing the new obj/update obj 
 * and setting the action queryparam to CREATE or UPDATE. 
 * delete the customer by passing customerId as queryparam and setting the action queryparam to DELETE
 * @tags customer
 * @return {object} 200 - success response - application/json: customer object
 * @return {object} 500 - Bad request response
 */
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