// Service class for Products
// Import repository instances
import {productsRepository} from "../Repositories/index.repository.js"
// Imports
import { linkBuilder } from "../util.js"

class ProductsService {
    // Builds query and options for the paginate method of the productModel
    async getProducts(limit = 10, pageNumber = 1, sort = null, queryField = null, queryVal = null, URL = "") {

        // Pagination
        const { docs, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage } = await productsRepository.getProducts(limit, pageNumber, sort, queryField, queryVal)
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
        if (!productsRepository.isIdValid(productId)) {
            throw `Product ID ${productId} is not a valid format`
        }

        const product = await productsRepository.getProductById(productId)

        if (!product) {
            throw `Product ${productId} doesn't exist - Check logs`
        }
        return product
    }

    // Creates document in Mongo
    async addProduct(title, description, code, price, status, stock, category, thumbnails) {
        let newDoc = { title: title, description: description, code: code, price: price, status: status, stock: stock, category: category, thumbnails: thumbnails }
        return await productsRepository.addProduct(newDoc)
    }

    // Updates document by ID
    async updateProduct(productId, doc) {
        if (!productsRepository.isIdValid(productId)) {
            throw `Product ID ${productId} is not a valid format`
        }
        const document = await productsRepository.updateProduct(productId, doc)

        if (!document) {
            throw `Product ${productId} doesn't exist - Check logs`
        }
        return document
    }

    // Deletes document by ID
    async deleteProduct(productId) {
        if (!productsRepository.isIdValid(productId)) {
            throw `Product ID ${productId} is not a valid format`
        }
        const document = await productsRepository.deleteProduct(productId)

        if (!document) {
            throw `Product ${productId} doesn't exist - Check logs`
        }
        return document
    }
}

export default ProductsService