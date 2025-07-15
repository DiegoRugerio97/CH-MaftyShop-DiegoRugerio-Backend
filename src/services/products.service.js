// Service class for Products
// Imports
import ProductsDAO from "../DAOs/Mongo/products.dao.js"
import { linkBuilder } from "../util.js"

// Products DAO
const productsDAO = new ProductsDAO()

class ProductsService {
    // Builds query and options for the paginate method of the productModel
    async getProducts(limit = 10, pageNumber = 1, sort = null, queryField = null, queryVal = null, URL = "") {

        // Pagination
        const { docs, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage } = await productsDAO.getProducts(limit, pageNumber, sort, queryField, queryVal)
        if (pageNumber > totalPages) {
            throw `Page ${pageNumber} doesn't exist`
        }

        // Builds the links
        const queryParameters = { limit, sort, queryField, queryVal }
        const { prevLink, nextLink } = linkBuilder(URL, queryParameters, hasNextPage, hasPrevPage, page)

        return { docs, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage, prevLink, nextLink };
    }

    // Find by ID
    async getProductById(productId) {
        if (!productsDAO.isIdValid(productId)) {
            throw `Product ID ${productId} is not a valid format`
        }

        const product = await productsDAO.getProductById(productId)

        if (!product) {
            throw `Product ${productId} doesn't exist - Check logs`
        }
        return product
    }

    // Creates document in Mongo
    async addProduct(title, description, code, price, status, stock, category, thumbnails) {
        let newDoc = { title: title, description: description, code: code, price: price, status: status, stock: stock, category: category, thumbnails: thumbnails }
        return await productsDAO.addProduct(newDoc)
    }

    // Updates document by ID
    async updateProduct(productId, doc) {
        if (!productsDAO.isIdValid(productId)) {
            throw `Product ID ${productId} is not a valid format`
        }
        const document = await productsDAO.updateProduct(productId, doc)

        if (!document) {
            throw `Product ${productId} doesn't exist - Check logs`
        }
        return document
    }

    // Deletes document by ID
    async deleteProduct(productId) {
        if (!productsDAO.isIdValid(productId)) {
            throw `Product ID ${productId} is not a valid format`
        }
        const document = await productsDAO.deleteProduct(productId)

        if (!document) {
            throw `Product ${productId} doesn't exist - Check logs`
        }
        return document
    }
}

export default ProductsService