// Product Router
// Imports
import { Router } from "express"
import ProductController from "../controller/products.controller.js"
import passport from "passport"
import { authorize } from "./middleware.js"
// Router
const router = Router()
// Product Controller 
const productController = new ProductController()


// GET - Accepts limit, sort, queryField and queryVal in query params - Returns all products
router.get('/', productController.getProducts)
// GET - With product ID - Returns information of a single product
router.get('/:pId', productController.getProductById)
// POST - Creates a new product - Body validaton included
router.post('/', passport.authenticate('jwt', {session: false }), authorize(["ADMIN"]), productController.addProduct)
// PUT - With product ID - Modifies a product with body information
router.put('/:pId', passport.authenticate('jwt', {session: false }), authorize(["ADMIN"]), productController.updateProduct)
// DELETE - With product ID
router.delete('/:pId', passport.authenticate('jwt', {session: false }), authorize(["ADMIN"]), productController.deleteProduct)

export default router