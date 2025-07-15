// Carts Router
// Imports
import { Router } from "express"
import CartsController from "../controller/carts.controller.js"
// Router
const router = Router()
// Cart Controller
const cartsController = new CartsController()

// GET - With cart ID - Return cart content
router.get('/:cId', cartsController.getCartById)
// POST - Creates a new cart
router.post('/', cartsController.createCart)
// POST - With cart ID and product ID - Adds amount in body of Product in Cart matching the ID
router.post('/:cId/products/:pId', cartsController.addProductToCart)
// PUT - With cart ID - Updates entire products array of the Cart matching the ID
router.put('/:cId', cartsController.updateCart)
// PUT - With cart ID and product ID - Overwrites quantity of Product in Cart with both matching IDs
router.put('/:cId/products/:pId', cartsController.updateProductInCart)
// DELETE - Deletes a cart
router.delete('/:cId', cartsController.deleteCart )
// DELETE - With product ID - Deletes the product matching the IDs from a specific cart
router.delete('/:cId/products/:pId', cartsController.deleteProductFromCart)

export default router