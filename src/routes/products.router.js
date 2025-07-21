// Product Router
// Imports
import { Router } from "express"
import ProductController from "../controller/products.controller.js"
import { authorize, jwtAuthenticationRedirect} from "./middleware.js"
// Router
const router = Router()
// Product Controller 
const productController = new ProductController()
// Base middleware array
const mainMiddlewares = [jwtAuthenticationRedirect('/api/sessions/failAuthenticated')]

// GET - Accepts limit, sort, queryField and queryVal in query params - Returns all products
router.get('/', mainMiddlewares, authorize(["USER"]), productController.getProducts)
// GET - With product ID - Returns information of a single product
router.get('/:pId', mainMiddlewares, authorize(["USER"]), productController.getProductById)
// POST - Creates a new product - Body validaton included
router.post('/', mainMiddlewares, authorize(["ADMIN"]), productController.addProduct)
// PUT - With product ID - Modifies a product with body information
router.put('/:pId', mainMiddlewares, authorize(["ADMIN"]), productController.updateProduct)
// DELETE - With product ID
router.delete('/:pId', mainMiddlewares, authorize(["ADMIN"]), productController.deleteProduct)

export default router