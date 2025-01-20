import { Router } from "express"
import ProductManager from '../ProductManager.js'
import {productBodyValidationPost, productBodyValidationPut} from '../util.js'

let filePath = './src/JSON/'
let fileName = 'products.json'
const pm = new ProductManager(filePath+fileName)

const router = Router()

router.get('/', async (req, res)=>{
    try {
        const products = await pm.getProducts()
        res.status(200).send({status:"SUCCESS", response: products})
    } catch (error) {
        res.status(500).send({status:"ERROR", error})
    }
})

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

router.post('/', async (req, res)=>{
    try {
        let productBody = req.body
        const {title, description, code, price, status, stock, category, thumbnails} = productBodyValidationPost(productBody)
        console.log(title, description, code, price, status, stock, category, thumbnails)
        const response = await pm.addProduct(title,description, code, price, status, stock, category, thumbnails)
        res.status(200).send({status:"SUCCESS", response: response})
    } catch (error) {
        res.status(500).send({status:"ERROR", error})
    }
})

router.put('/:pId', async (req, res)=>{
    try {
        let productId = parseInt(req.params.pId)
        let productBody = req.body
        let validatedBody = productBodyValidationPut(productBody)
        const response = await pm.updateProduct(productId, validatedBody)
        res.status(200).send({status:"SUCCESS", response: response})
    } catch (error) {
        res.status(500).send({status:"ERROR", error})
    }
})

router.delete('/:pId', async (req, res)=>{
    try {
        let productId = parseInt(req.params.pId)
        if(isNaN(productId)){
            res.status(400).send({status:"ERROR", response: "WARNING: Provide a valid product ID"})
            return
        }
        const response = await pm.deleteProduct(productId)
        res.status(200).send({status:"SUCCESS", response: response})
    } catch (error) {
        res.status(500).send({status:"ERROR", error})
    }
})

export default router