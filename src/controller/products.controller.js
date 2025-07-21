// Controller class for Products
// Imports
import { productBodyValidationPost, productBodyValidationPut, sanitizeQueryParams } from '../util.js'
// Products Service
import {productsService} from "../services/index.service.js"

class ProductsController {
    // GET - Accepts limit, sort, queryField and queryVal in query params - Returns all products
    // queryField - category/stock
    // queryVal category - Manga, Gunpla, Figures
    // queryVal stock - 0(In stock)
    // Combining both will clear query and return default search
    async getProducts(req, res) {
        try {
            const protocol = req.protocol
            const host = req.hostname
            const port = process.env.PORT
            const ROUTE = '/api/products'
            const URL = `${protocol}://${host}:${port}${ROUTE}`

            const queryParameters = sanitizeQueryParams(req.query)
            const { limit, pageNumber, sort, queryField, queryVal } = queryParameters

            const paginateResponse = await productsService.getProducts(limit, pageNumber, sort, queryField, queryVal, URL)

            const { products, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage, prevLink, nextLink } = paginateResponse

            const response = { status: "SUCCESS", payload: products, totalPages: totalPages, prevPage: prevPage, nextPage: nextPage, page: page, hasPrevPage: hasPrevPage, hasNextPage: hasNextPage, prevLink: prevLink, nextLink: nextLink }
            res.status(200).send(response)
        } catch (error) {
            res.status(400).send({ status: "ERROR", error })
        }
    }

    // GET - With product ID - Returns information of a single product
    async getProductById(req, res) {
        try {
            const productId = req.params.pId
            const product = await productsService.getProductById(productId)
            res.status(200).send({ status: "SUCCESS", response: product })
        } catch (error) {
            res.status(400).send({ status: "ERROR", error })
        }
    }

    // POST - Creates a new product - Body validaton included
    async addProduct(req, res) {
        try {
            const productBody = req.body
            const { title, description, code, price, status, stock, category, thumbnails } = productBodyValidationPost(productBody)
            const response = await productsService.addProduct(title, description, code, price, status, stock, category, thumbnails)

            // Socket emit
            const app = req.app
            const socketServer = app.get('io')
            socketServer.emit("product_update_add", { id: response._id.toString(), title: title, description: description, code: code, price: price, stock: stock, thumbnails: thumbnails })

            res.status(200).send({ status: "SUCCESS", response: response })
        } catch (error) {
            res.status(400).send({ status: "ERROR", error })
        }
    }

    // PUT - With product ID - Modifies a product with body information - Body validation included
    async updateProduct(req, res) {
        try {
            const productId = req.params.pId
            const productBody = req.body
            const validatedBody = productBodyValidationPut(productBody)
            const response = await productsService.updateProduct(productId, validatedBody)
            res.status(200).send({ status: "SUCCESS", response: response })
        } catch (error) {
            res.status(400).send({ status: "ERROR", error })
        }
    }

    // DELETE - With product ID - Deletes a product 
    async deleteProduct(req, res) {
        try {
            const productId = req.params.pId
            const response = await productsService.deleteProduct(productId)

            // Socket emit
            const app = req.app
            const socketServer = app.get('io')
            socketServer.emit("product_update_remove", productId)

            res.status(200).send({ status: "SUCCESS", response: response })
        } catch (error) {
            res.status(400).send({ status: "ERROR", error })
        }
    }
}

export default ProductsController