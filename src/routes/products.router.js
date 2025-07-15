// Product Router
// Imports
import { Router } from "express"
import ProductController from "../controller/products.controller.js"
// Router
const router = Router()
// Product Controller 
const productController = new ProductController()

// GET - Accepts limit, sort, queryField and queryVal in query params - Returns all products
router.get('/', productController.getProducts)
// GET - With product ID - Returns information of a single product
router.get('/:pId', productController.getProductById)
// POST - Creates a new product - Body validaton included
router.post('/', productController.addProduct)
// PUT - With product ID - Modifies a product with body information
router.put('/:pId', productController.updateProduct)
// DELETE - With product ID
router.delete('/:pId', productController.deleteProduct)

export default router