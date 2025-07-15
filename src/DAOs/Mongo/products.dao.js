// Product DAO using Mongo persistence
// Imports
import productModel from '../Mongo/Models/product.model.js'
import mongoose from 'mongoose'

class ProductsDAO {

    // Builds query and options for the paginate method of the productModel
    async getProducts(limit, pageNumber, sort, queryField, queryVal) {
        try {
            const {query, options} = this.buildPaginationParameters(limit, pageNumber, sort, queryField, queryVal)
            return await productModel.paginate(query, options)
        } catch (error) {
            console.log({ error })
            return null
        }
    }

    // Find by ID
    async getProductById(productId) {
        try {
            const product = await productModel.findById(productId).lean().exec()
            return product
        } catch (error) {
            console.log({ error })
            return null
        }
    }

    // Creates document in Mongo
    async addProduct(productObj) {
        try {
            return await productModel.create(productObj)
        } catch (error) {
            console.log({ error })
            return null
        }
    }

    // Updates document by ID
    async updateProduct(productId, doc) {
        try {
            const document = await productModel.findByIdAndUpdate(productId, doc, { returnDocument: "after" }).exec()
            return document
        } catch (error) {
            console.log({ error })
            return null
        }
    }

    // Deletes document by ID
    async deleteProduct(productId) {
        try {
            let document = await productModel.findByIdAndDelete(productId).exec()
            return document
        } catch (error) {
            console.log({ error })
            return null
        }
    }

    isIdValid(productId) {
        return mongoose.Types.ObjectId.isValid(productId)
    }

    buildPaginationParameters(limit, pageNumber, sort, queryField, queryVal) {
        let query = {}
        const options = {
            limit: limit,
            page: pageNumber,
            lean: true
        }
        if (sort) {
            options.sort = { price: sort, _id: -1 }
        }
        if (queryField && queryVal && queryField != "null" && queryVal != "null") {
            query = { [queryField]: queryVal }
        }
        if (queryField == "stock" && queryVal) {
            query = { [queryField]: { $gt: queryVal } }
        }
        if ((queryField == "category" && queryVal == "0") || (queryField == "stock" && ['Figures', 'Manga', 'Gunpla'].includes(queryVal))) {
            query = {}
        }
        return { query, options }
    }
}

export default ProductsDAO