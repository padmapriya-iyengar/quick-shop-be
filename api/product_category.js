const express = require('express')
const productCategory = express.Router({mergeParams: true})

const pCategoryServ = require('../services/product_category')

productCategory.get('/',(req,res) => {
    pCategoryServ.getPCategoryById(req.query).then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

productCategory.get('/all',(req,res) => {
    pCategoryServ.getAllPCategories().then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

productCategory.get('/active',(req,res) => {
    pCategoryServ.getActivePCategories().then((rows)=>{
        res.status(200).json(rows)
    }).catch((err) => setImmediate(()=>{throw err;}))
})

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