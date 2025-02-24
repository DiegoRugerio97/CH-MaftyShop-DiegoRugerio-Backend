// Carts Router
// Imports
import { Router } from "express"
import CartManager from '../DAOs/MongoManager/CartManager.js'
// Cart Manager
const cm = new CartManager()

// Router
const router = Router()


// GET - With cart ID - Return cart content
router.get('/:cId', async (req, res) => {
    try {
        const cartId = req.params.cId
        const cart = await cm.getCartById(cartId)
        res.status(200).send({ status: "SUCCESS", response: cart })
    } catch (error) {
        res.status(400).send({ status: "ERROR", error })
    }
})

// POST - Creates a new cart
router.post('/', async (req, res) => {
    try {
        const response = await cm.createCart()
        res.status(200).send({ status: "SUCCESS", response: response })
    } catch (error) {
        res.status(400).send({ status: "ERROR", error })
    }
})

// POST - With cart ID and product ID - Adds amount in body of Product in Cart matching the ID
router.post('/:cId/products/:pId', async (req, res) => {
    try {
        const cartId = req.params.cId
        const productId = req.params.pId
        const productQuantity = req.body.productQuantity
        const response = await cm.addProductToCart(cartId, productId, productQuantity)
        res.status(200).send({ status: "SUCCESS", response: response })
    } catch (error) {
        res.status(400).send({ status: "ERROR", error })
    }
})

// PUT - With cart ID - Updates entire products array of the Cart matching the ID
router.put('/:cId', async (req, res) => {
    try {
        const cartId = req.params.cId
        const productsArray = req.body.products
        const response = await cm.updateCart(cartId, productsArray)
        res.status(200).send({ status: "SUCCESS", response: response })
    } catch (error) {
        res.status(400).send({ status: "ERROR", error })
    }
})

// PUT - With cart ID and product ID - Overwrites quantity of Product in Cart with both matching IDs
router.put('/:cId/products/:pId', async (req, res) => {
    try {
        const cartId = req.params.cId
        const productId = req.params.pId
        const productQuantity = req.body.productQuantity
        const response = await cm.updateQuantity(cartId, productId, productQuantity)
        res.status(200).send({ status: "SUCCESS", response: response })
    } catch (error) {
        res.status(400).send({ status: "ERROR", error })
    }
})

// DELETE - Deletes a cart
router.delete('/:cId', async (req, res) => {
    try {
        const cartId = req.params.cId
        const response = await cm.deleteCart(cartId)
        res.status(200).send({ status: "SUCCESS", response: response })
    } catch (error) {
        res.status(400).send({ status: "ERROR", error })
    }
})

// DELETE - With product ID - Deletes the product matching the IDs from a specific cart
router.delete('/:cId/products/:pId', async (req, res) => {
    try {
        const cartId = req.params.cId
        const productId = req.params.pId
        const response = await cm.deleteProductFromCart(cartId,productId)
        res.status(200).send({ status: "SUCCESS", response: response })
    } catch (error) {
        res.status(400).send({ status: "ERROR", error })
    }
})

export default router