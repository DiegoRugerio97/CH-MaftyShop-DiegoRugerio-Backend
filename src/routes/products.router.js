// Product Router
// Imports
import { Router } from "express"
import ProductManager from '../ProductManager.js'
import {productBodyValidationPost, productBodyValidationPut} from '../util.js'

// Product Manager 
let filePath = './src/JSON/'
let fileName = 'products.json'
const pm = new ProductManager(filePath+fileName)

// Router
const router = Router()

// GET - Accepts limit in query params - Returns all products
router.get('/', async (req, res)=>{
    try {
        const products = await pm.getProducts()
        let limit = req.query.limit
        if (!limit || isNaN(limit) || limit<0) {
            res.status(200).send({status:"SUCCESS", response: products})
            return
        }
        let slicedArray = products.slice(0, limit)
        res.status(200).send({status:"SUCCESS", response: slicedArray})
    } catch (error) {
        res.status(500).send({status:"ERROR", error})
    }
})

// GET - With product ID - Returns information of a single product
router.get('/:pId', async (req, res)=>{
    try {
        let productId = parseInt(req.params.pId)
        if(isNaN(productId)){
            res.status(400).send({status:"ERROR", response: "WARNING: Provide a valid product ID"})
            return
        }
        const product = await pm.getProductById(productId)
        res.status(200).send({status:"SUCCESS", response: product})
    } catch (error) {
        res.status(500).send({status:"ERROR", error})
    }
})

// POST - Creates a new product - Body validaton included
router.post('/', async (req, res)=>{
    try {
        let productBody = req.body
        const {title, description, code, price, status, stock, category, thumbnails} = productBodyValidationPost(productBody)
        const response = await pm.addProduct(title,description, code, price, status, stock, category, thumbnails)
        
         // Socket emit
        const app = req.app
        const socketServer = app.get('io')
        socketServer.emit("product_update_add", { id: response.product.id, title: title, description: description, code: code, price: price, stock: stock, thumbnails: thumbnails })

        res.status(200).send({status:"SUCCESS", response: response.message})
    } catch (error) {
        res.status(400).send({status:"ERROR", error})
    }
})

// PUT - With product ID - Modifies a product with body information - Body validation included
router.put('/:pId', async (req, res)=>{
    try {
        let productId = parseInt(req.params.pId)
        let productBody = req.body
        let validatedBody = productBodyValidationPut(productBody)
        const response = await pm.updateProduct(productId, validatedBody)
        res.status(200).send({status:"SUCCESS", response: response})
    } catch (error) {
        res.status(400).send({status:"ERROR", error})
    }
})

// DELETE - With product ID - Deletes a product 
router.delete('/:pId', async (req, res)=>{
    try {
        let productId = parseInt(req.params.pId)
        if(isNaN(productId)){
            res.status(400).send({status:"ERROR", response: "WARNING: Provide a valid product ID"})
            return
        }
        const response = await pm.deleteProduct(productId)

        // Socket emit
        const app = req.app
        const socketServer = app.get('io')
        socketServer.emit("product_update_remove",productId)

        res.status(200).send({status:"SUCCESS", response: response})
    } catch (error) {
        res.status(500).send({status:"ERROR", error})
    }
})

export default router