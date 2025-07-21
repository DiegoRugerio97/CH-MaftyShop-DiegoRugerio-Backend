// Product Router
// Imports
import { Router } from "express"
import ViewController from "../controller/views.controller.js"
import { authorize, authorizeCart, jwtAuthenticationRedirect } from "./middleware.js"
// Router
const router = Router()
// View Controller
const viewController = new ViewController()
// Base middleware array
const mainMiddlewares = [jwtAuthenticationRedirect('/login'), authorize(["USER"])]

// GET - Accepts limit, sort, queryField and queryVal in query params from frontend - Returns all products
router.get('/products', mainMiddlewares, viewController.renderProducts)
// GET - Real time updates on added/deleted products using sockets
router.get('/realtimeproducts', mainMiddlewares, viewController.renderRealTimeProducts)
// GET - Complete cart detail with list of products of matching cart ID
router.get('/carts/:cId', mainMiddlewares, authorizeCart(), viewController.renderCartById)
// GET - Complete product detail of matching product ID
router.get('/products/:pId', mainMiddlewares, viewController.renderProductById)
// GET - Tickets created by user
router.get('/tickets', mainMiddlewares, viewController.renderTicketsByUser)
// Session views
router.get('/register', viewController.renderRegister)
router.get('/login', viewController.renderLogin)
router.get('/forgetPassword', viewController.renderForgetPassword)
router.get('/resetPassword', viewController.renderResetPassword)

export default router;