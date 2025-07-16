// Controller class for Carts
// Imports
// Carts Service
import {cartsService} from "../services/index.service.js"

class CartsController {

    // GET - With cart ID - Return cart content
    async getCartById(req, res) {
        try {
            const cartId = req.params.cId
            const response = await cartsService.getCartById(cartId)
            res.status(200).send({ status: "SUCCESS", response })
        } catch (error) {
            res.status(400).send({ status: "ERROR", error })
        }
    }

    // POST - Creates a new cart
    async createCart(req, res) {
        try {
            const response = await cartsService.createCart()
            res.status(200).send({ status: "SUCCESS", response })
        } catch (error) {
            res.status(400).send({ status: "ERROR", error })
        }
    }

    // POST - With cart ID and product ID - Adds amount in body of Product in Cart matching the ID
    async addProductToCart(req, res) {
        try {
            const cartId = req.params.cId
            const productId = req.params.pId
            const productQuantity = req.body.productQuantity
            const response = await cartsService.addProductToCart(cartId, productId, productQuantity)
            res.status(200).send({ status: "SUCCESS", response })
        } catch (error) {
            res.status(400).send({ status: "ERROR", error })
        }
    }

    // PUT - With cart ID - Updates entire products array of the Cart matching the ID
    async updateCart(req, res) {
        try {
            const cartId = req.params.cId
            const productsArray = req.body.products
            const response = await cartsService.updateCart(cartId, productsArray)
            res.status(200).send({ status: "SUCCESS", response: response })
        } catch (error) {
            res.status(400).send({ status: "ERROR", error })
        }
    }

    // PUT - With cart ID and product ID - Overwrites quantity of Product in Cart with both matching IDs
    async updateProductInCart(req, res) {
        try {
            const cartId = req.params.cId
            const productId = req.params.pId
            const productQuantity = req.body.productQuantity
            const response = await cartsService.updateQuantityInCart(cartId, productId, productQuantity)
            res.status(200).send({ status: "SUCCESS", response: response })
        } catch (error) {
            res.status(400).send({ status: "ERROR", error })
        }
    }
    // DELETE - Deletes a cart
    async deleteCart(req, res) {
        try {
            const cartId = req.params.cId
            const response = await cartsService.deleteCart(cartId)
            res.status(200).send({ status: "SUCCESS", response: response })
        } catch (error) {
            res.status(400).send({ status: "ERROR", error })
        }
    }
    // DELETE - With product ID - Deletes the product matching the IDs from a specific cart
    async deleteProductFromCart(req, res) {
        try {
            const cartId = req.params.cId
            const productId = req.params.pId
            const response = await cartsService.deleteProductFromCart(cartId, productId)
            res.status(200).send({ status: "SUCCESS", response: response })
        } catch (error) {
            res.status(400).send({ status: "ERROR", error })
        }
    }

    
}

export default CartsController