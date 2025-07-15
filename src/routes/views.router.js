// Product Router
// Imports
import { Router } from "express"
import passport from "passport"
import ViewController from "../controller/views.controller.js"
// Router
const router = Router()
// View Controller
const viewController = new ViewController()

// GET - Accepts limit, sort, queryField and queryVal in query params from frontend - Returns all products
router.get('/products', passport.authenticate('jwt', {failureRedirect:'/login', session:false}), viewController.renderProducts)
// GET - Real time updates on added/deleted products using sockets
router.get('/realtimeproducts', viewController.renderRealTimeProducts)
// GET - Complete cart detail with list of products of matching cart ID
router.get('/carts/:cId', viewController.renderCartById)
// GET - Complete product detail of matching product ID
router.get('/products/:pId', viewController.renderProductById)
// Session views
router.get('/register', viewController.renderRegister)
router.get('/login', viewController.renderLogin)

export default router;