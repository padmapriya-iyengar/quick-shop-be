const express = require('express')
const product = express.Router({mergeParams: true})

const productServ = require('../services/product')

product.get('/',(req,res) => {
    productServ.getProductById(req.query).then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

product.get('/all',(req,res) => {
    productServ.getAllProducts().then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

product.get('/active',(req,res) => {
    productServ.getActiveProducts().then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

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