// Carts Router
// Imports
import { Router } from "express"
import CartManager from '../CartManager.js'
import ProductManager from '../ProductManager.js'
// Cart Manager
let filePath = './src/JSON/'
let fileName = 'carts.json'
const cm = new CartManager(filePath + fileName)

// Product Manager for validation purposes
let fileNameProducts = 'products.json'
const pm = new ProductManager(filePath + fileNameProducts)

// Router
const router = Router()


// GET - With cart ID - Return cart content
router.get('/:cId', async (req, res) => {
    try {
        let cartId = parseInt(req.params.cId)
        if (isNaN(cartId)) {
            res.status(400).send({ status: "ERROR", response: "WARNING: Provide a valid cart ID" })
            return
        }
        const cart = await cm.getCartById(cartId)
        res.status(200).send({ status: "SUCCESS", response: cart })
    } catch (error) {
        res.status(500).send({ status: "ERROR", error })
    }
})

// POST - Creates a new cart
router.post('/', async (req, res) => {
    try {
        const response = await cm.createCart()
        res.status(200).send({ status: "SUCCESS", response: response })
    } catch (error) {
        res.status(500).send({ status: "ERROR", error })
    }
})

// POST - With cart ID and product ID - Adds amount in body of Product in Cart matching the ID
router.post('/:cId/products/:pId', async (req, res) => {
    try {
        let cartId = parseInt(req.params.cId)
        if (isNaN(cartId)) {
            res.status(400).send({ status: "ERROR", response: "WARNING: Provide a valid cart ID" })
            return
        }
        let productId = parseInt(req.params.pId)
        if (isNaN(productId)) {
            res.status(400).send({ status: "ERROR", response: "WARNING: Provide a valid product ID" })
            return
        }
        let quantity = req.body.quantity

        let pmResponse = await pm.getProductById(productId)
        if (!(typeof pmResponse == 'object')) {
            res.status(400).send({ status: "ERROR", response: pmResponse })
            return
        }

        const response = await cm.addProductToCart(cartId, productId, quantity)
        res.status(200).send({ status: "SUCCESS", response: response })
    } catch (error) {
        res.status(500).send({ status: "ERROR", error })
    }
})

// DELETE - Deletes a cart
router.delete('/:cId', async (req, res) => {
    try {
        let cartId = parseInt(req.params.cId)
        if (isNaN(cartId)) {
            res.status(400).send({ status: "ERROR", response: "WARNING: Provide a valid cart ID" })
            return
        }
        const response = await cm.deleteCart(cartId)
        res.status(200).send({ status: "SUCCESS", response: response })
    } catch (error) {
        res.status(500).send({ status: "ERROR", error })
    }
})

export default router