// Product Manager using Mongo persistence
import { productModel } from '../Models/product.model.js'
import { linkBuilder } from '../../util.js'
import mongoose from 'mongoose'

class ProductManager {

    // Builds query and options for the paginate method of the productModel
    async getProducts(limit = 10, pageNumber = 1, sort = null, queryField = null, queryVal = null, URL = "") {
        let query = {}
        const options = {
            limit: limit,
            page: pageNumber,
            lean: true
        }
        if (sort) {
            options.sort = { price: sort , _id: -1}
        }
        if (queryField && queryVal && queryField != "null" && queryVal != "null") {
            query = { [queryField]: queryVal }
        }
        if (queryField == "stock" && queryVal) {
            query = { [queryField]: { $gt: queryVal } }
        }
        if ((queryField == "category" && queryVal == "0")|| (queryField == "stock" && ['Figures','Manga','Gunpla'].includes(queryVal))) {
            query = {}
        }

        // Pagination
        const { docs, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage } = await productModel.paginate(query, options)
        if (pageNumber > totalPages) {
            throw `Page ${pageNumber} doesn't exist`
        }

        // Builds the links
        const queryParameters = {limit, sort, queryField, queryVal}
        const { prevLink, nextLink } = linkBuilder(URL, queryParameters, hasNextPage, hasPrevPage, page)

        return {docs, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage, prevLink, nextLink};
    }

    // Find by ID
    async getProductById(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw `ID ${id} is not a valid format`
        }

        let query = productModel.findById(id).lean()
        const product = await query.exec()

        if (!product) {
            throw `Product with ID ${id} does not exist`
        }
        return product
    }

    // Creates document in Mongo
    async addProduct(title, description, code, price, status, stock, category, thumbnails) {
        let newDoc = { title: title, description: description, code: code, price: price, status: status, stock: stock, category: category, thumbnails: thumbnails }
        const response = await productModel.create(newDoc)
        return response
    }

    // Updates document by ID
    async updateProduct(id, doc) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw `ID ${id} is not a valid format`
        }
        let query = productModel.findByIdAndUpdate(id, doc, { returnDocument: "after" })
        const response = await query.exec()
        if (!response) {
            throw `Product with ID ${id} does not exist`
        }
        return response
    }

    // Deletes document by ID
    async deleteProduct(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw `ID ${id} is not a valid format`
        }
        let query = productModel.findByIdAndDelete(id)
        const response = await query.exec()
        if (!response) {
            throw `Product with ID ${id} does not exist`
        }
        return response
    }
}

export default ProductManager