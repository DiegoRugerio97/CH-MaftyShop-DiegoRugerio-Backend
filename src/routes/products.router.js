import { Router } from "express"
import ProductManager from '../ProductManager.js'

let filePath = './src/'
let fileName = 'products.json'
const pm = new ProductManager(filePath+fileName)

const router = Router()

router.get('/', async (req, res)=>{
    try {
        const products = await pm.getProducts()
        res.send(products)
    } catch (error) {
        res.send(error)
    }
})

router.get('/:pId', async (req, res)=>{
    try {
        let productId = parseInt(req.params.pId)
        const product = await pm.getProductById(productId)
        res.send(product)
    } catch (error) {
        res.send(error)
    }
})

router.post('/', async (req, res)=>{
    try {
        let productBody = req.body
        const response = await pm.addProduct(productBody)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})

router.put('/:pId', async (req, res)=>{
    try {
        let productId = parseInt(req.params.pId)
        let productBody = req.body
        const response = await pm.updateProduct(productId, productBody)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})

router.delete('/:pId', async (req, res)=>{
    try {
        let productId = parseInt(req.params.pId)
        const response = await pm.deleteProduct(productId)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})

export default router