// Product Router
// Imports
import { Router } from "express"
import ProductManager from '../DAOs/MongoManager/ProductManager.js'
import CartManager from '../DAOs/MongoManager/CartManager.js'
import { sanitizeQueryParams } from "../util.js"
// Passport
import passport from 'passport'
// Product Manager 
const pm = new ProductManager()
const cm = new CartManager()

// Router
const router = Router()

// GET - Accepts limit, sort, queryField and queryVal in query params from frontend - Returns all products
// queryField - category/stock
// queryVal category - Manga, Gunpla, Figures
// queryVal stock - 0(In stock)
// Combining both will clear query and return default search
router.get('/products', passport.authenticate('jwt', {failureRedirect:'/login', session:false}), async (req, res) => {
    try {
        const protocol = req.protocol
        const host = req.hostname
        const port = process.env.PORT
        const ROUTE = '/products'
        const URL = `${protocol}://${host}:${port}${ROUTE}`

        const queryParameters = sanitizeQueryParams(req.query)
        const { limit, pageNumber, sort, queryField, queryVal } = queryParameters
        const paginateResponse = await pm.getProducts(limit, pageNumber, sort, queryField, queryVal, URL)
        const {docs, hasPrevPage, hasNextPage, prevLink, nextLink} = paginateResponse
        res.status(200).render('products', {user: req.user.payload, docs: docs, prevLink: prevLink, nextLink: nextLink, hasNextPage: hasNextPage, hasPrevPage: hasPrevPage })
    }
    catch (error) {
        res.status(500).send({ 'ERROR': error })
    }
})

// GET - Real time updates on added/deleted products using sockets
router.get('/realtimeproducts', async (req, res) => {
    const app = req.app
    const socketServer = app.get("io")
    socketServer.on('connection', socket => {
        console.log("Cliente conectado")
    })
    try {
        // Setting limit to 100 to observe socket effects
        const LIMIT = 100
        const paginateResponse = await pm.getProducts(LIMIT)
        const {docs} = paginateResponse
        res.status(200).render('realtimeproducts', {products:docs})
    }
    catch (error) {
        res.status(500).send({ 'ERROR': error })
    }
})

// GET - Complete cart detail with list of products of matching cart ID
router.get('/carts/:cId', async (req, res) => {
    try {
        const cartId = req.params.cId
        const response = await cm.getCartById(cartId)
        res.status(200).render('cart', {cId:cartId, cartProducts:response})
    }
    catch (error) {
        res.status(500).send({ 'ERROR': error })
    }
})

// GET - Complete product detail of matching product ID
router.get('/products/:pId', async (req, res) => {
    try {
        const productId = req.params.pId
        const product = await pm.getProductById(productId)
        res.status(200).render('product', {product})
    }
    catch (error) {
        res.status(500).send({ 'ERROR': error })
    }
})

router.get('/register', (req, res) => {
    if(req.cookies["userToken"]) return res.redirect('/products')
    return res.render('register')
})

router.get('/login',(req, res) => {
    if(req.cookies["userToken"]) return res.redirect('/products')
    return res.render('login')
})

export default router;