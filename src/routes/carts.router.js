// Carts Router
// Imports
import { Router } from "express"
import CartsController from "../controller/carts.controller.js"
import { jwtAuthenticationRedirect, authorize, authorizeCart } from "./middleware.js"
// Router
const router = Router()
// Cart Controller
const cartsController = new CartsController()
// Base middleware array
const mainMiddlewares = [jwtAuthenticationRedirect('/api/sessions/failAuthenticated')]

// GET - With cart ID - Return cart content
router.get('/:cId', mainMiddlewares, authorize(["USER"]), authorizeCart(), cartsController.getCartById)
// POST - Creates a new cart
router.post('/',mainMiddlewares, authorize(["ADMIN"]), cartsController.createCart)
// POST - With cart ID and product ID - Adds amount in body of Product in Cart matching the ID
router.post('/:cId/products/:pId', mainMiddlewares, authorize(["USER"]), authorizeCart(), cartsController.addProductToCart)
// PUT - With cart ID - Updates entire products array of the Cart matching the ID
router.put('/:cId',mainMiddlewares, authorize(["ADMIN"]), cartsController.updateCart)
// PUT - With cart ID and product ID - Overwrites quantity of Product in Cart with both matching IDs
router.put('/:cId/products/:pId',  mainMiddlewares, authorize(["USER"]), cartsController.updateProductInCart)
// DELETE - Deletes a cart
router.delete('/:cId',mainMiddlewares, authorize(["USER"]), authorizeCart(), cartsController.deleteCart )
// DELETE - With product ID - Deletes the product matching the IDs from a specific cart
router.delete('/:cId/products/:pId', mainMiddlewares, authorize(["USER"]), authorizeCart(), cartsController.deleteProductFromCart)

export default router