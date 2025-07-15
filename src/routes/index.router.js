// Main Router
// Router
import { Router } from "express"
// Routers imports
import cartRouter from './carts.router.js'
import productRouter from './products.router.js'
import sessionRouter from './session.router.js'

const mainRouter = Router()

mainRouter.use('/products', productRouter)
mainRouter.use('/carts', cartRouter)
mainRouter.use('/sessions',sessionRouter)

export default mainRouter