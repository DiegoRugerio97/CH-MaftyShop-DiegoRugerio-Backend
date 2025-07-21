// Controller class for Views
// Imports
import { sanitizeQueryParams } from "../util.js"
// Products Service
import { cartsService, productsService, ticketsService } from "../services/index.service.js"
// Cart Service


class ViewController {
    async renderProducts(req, res) {
        try {
            const protocol = req.protocol
            const host = req.hostname
            const port = process.env.PORT
            const ROUTE = '/products'
            const URL = `${protocol}://${host}:${port}${ROUTE}`

            const queryParameters = sanitizeQueryParams(req.query)
            const { limit, pageNumber, sort, queryField, queryVal } = queryParameters

            const paginateResponse = await productsService.getProducts(limit, pageNumber, sort, queryField, queryVal, URL)
            const { products, hasPrevPage, hasNextPage, prevLink, nextLink } = paginateResponse
            const user = req.user.payload

            res.status(200).render('products', { user, products, prevLink, nextLink, hasNextPage, hasPrevPage })
        }
        catch (error) {
            res.status(400).send({ 'ERROR': error })
        }
    }

    async renderRealTimeProducts(req, res) {
        const app = req.app
        const socketServer = app.get("io")
        socketServer.on('connection', socket => {
            console.log("Cliente conectado")
        })
        try {
            // Setting limit to 100 to observe socket effects
            const LIMIT = 100
            const paginateResponse = await productsService.getProducts(LIMIT)
            const { products } = paginateResponse
            res.status(200).render('realtimeproducts', { products })
        }
        catch (error) {
            res.status(400).send({ 'ERROR': error })
        }
    }

    async renderCartById(req, res) {
        try {
            const cartId = req.params.cId
            const response = await cartsService.getCartById(cartId)
            const { cart, cartTotal } = response

            res.status(200).render('cart', { cId: cartId, cart, cartTotal })
        }
        catch (error) {
            res.status(400).send({ 'ERROR': error })
        }
    }

    async renderProductById(req, res) {
        try {
            const productId = req.params.pId
            const user = req.user.payload
            const product = await productsService.getProductById(productId)
            res.status(200).render('product', { product, user })
        }
        catch (error) {
            res.status(400).send({ 'ERROR': error })
        }
    }

    async renderTicketsByUser(req, res) {
        try {
            const user = req.user.payload
            const tickets = await ticketsService.getTicketsByUserEmail(user.email)
            res.status(200).render('tickets', { tickets, user })
        }
        catch (error) {
            res.status(400).send({ 'ERROR': error })
        }
    }

    renderRegister(req, res) {
        if (req.cookies["userToken"]) return res.redirect('/products')
        return res.render('register')
    }

    renderLogin(req, res) {
        if (req.cookies["userToken"]) return res.redirect('/products')
        return res.render('login')
    }

    renderForgetPassword(req, res) {
        return res.render('forgetPassword')
    }

    renderResetPassword(req, res) {
        return res.render('resetPassword')
    }
}

export default ViewController