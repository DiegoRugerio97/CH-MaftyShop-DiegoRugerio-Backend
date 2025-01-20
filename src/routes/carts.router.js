import { Router } from "express"
import CartManager from '../CartManager.js'
import ProductManager from '../ProductManager.js'

let filePath = './src/'
let fileName = 'carts.json'
const cm = new CartManager(filePath+fileName)

let filePathProducts = './src/'
let fileNameProducts = 'products.json'
const pm = new ProductManager(filePath+fileName)


const router = Router()

router.get('/:cId', async (req, res)=>{
    try {
        let cartId = parseInt(req.params.cId)
        const cart = await cm.getCartById(cartId)
        res.send(cart)
    } catch (error) {
        res.send(error)
    }
})

router.post('/', async (req, res)=>{
    try {
        const response = await cm.createCart()
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})

router.post('/:cId/products/:pId', async (req, res)=>{
    try {
        let cartId = parseInt(req.params.cId)
        let productId = parseInt(req.params.pId)
        let quantity = req.body.quantity        
        const response = await cm.addProductToCart(cartId,productId,quantity)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})

router.delete('/:cId', async (req, res)=>{
    try {
        let cartId = parseInt(req.params.cId)
        const response = await cm.deleteCart(cartId)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})

export default router