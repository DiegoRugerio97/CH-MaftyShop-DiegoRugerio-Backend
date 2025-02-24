// Cart Manager with Mongo DB persistence
import { cartModel } from '../Models/cart.model.js'
import { productModel } from '../Models/product.model.js'
import mongoose from 'mongoose'

class CartManager {

    // Creates Cart in collection
    async createCart() {
        const response = await cartModel.create({})
        return response
    }

    // Finds Cart by ID, popullating each product in the cart, but only storing the ID
    async getCartById(cartId) {
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            throw `Cart ID ${cartId} is not a valid format`
        }

        const query = cartModel.findById(cartId).populate('products._id').lean()
        const cart = await query.exec()

        if (!cart) {
            throw `Cart with ID ${cartId} does not exist`
        }
        return cart.products
    }

    // Stores the ID of the product in the subdocument array or updates it
    async addProductToCart(cartId, productId, productQuantity) {
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            throw `Cart ID ${cartId} is not a valid format`
        }
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            throw `Product ID ${productId} is not a valid format`
        }

        const product = await productModel.findById(productId)
        if (!product) {
            throw `Product with ID ${productId} does not exist`
        }

        const cart = await cartModel.findById(cartId).exec()
        if (!cart) {
            throw `Cart with ID ${cartId} does not exist`
        }

        const productInCart = cart.products.id(productId)
        if (!productInCart) {
            cart.products.addToSet({ _id: product._id, quantity: productQuantity })
        }
        else {
            productInCart.quantity += productQuantity
        }
        await cart.save()
        return await cartModel.findOne({_id:cartId}).exec()
    }

    // Updates Cart with an array of products + internal Mongoose validations
    async updateCart(cartId, productsArray) {
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            throw `Cart ID ${cartId} is not a valid format`
        }
        if (!Array.isArray(productsArray)) {
            throw `Incorrect body format on ${productsArray}`
        }

        const cart = await cartModel.findById(cartId).exec()
        if (!cart) {
            throw `Cart with ID ${cartId} does not exist`
        }
        cart.products = productsArray
        await cart.save()
        return await cartModel.findById(cartId).exec()
    }

    // Updates the quantity of product in Cart with both matching IDs
    async updateQuantity(cartId, productId, productQuantity) {
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            throw `Cart ID ${cartId} is not a valid format`
        }
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            throw `Product ID ${productId} is not a valid format`
        }

        const product = await productModel.findById(productId)
        if (!product) {
            throw `Product with ID ${productId} does not exist`
        }

        const cart = await cartModel.findById(cartId).exec()
        if (!cart) {
            throw `Cart with ID ${cartId} does not exist`
        }

        const productInCart = cart.products.id(productId)
        if (!productInCart) {
            throw `Product with ID ${productId} does not exist in Cart with ID ${cartId}`
        }
        else {
            productInCart.quantity = productQuantity
        }
        await cart.save()
        return await cartModel.findById(cartId).exec()
    }

    // Deletes the entire product array of a Cart with matching ID
    async deleteCart(cartId) {
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            throw `Cart ID ${cartId} is not a valid format`
        }

        const cart = await cartModel.findById(cartId).exec()
        if (!cart) {
            throw `Cart with ID ${cartId} does not exist`
        }

        cart.products = []
        await cart.save()
        return await cartModel.findById(cartId).exec()
    }

    // Deletes entire product from product Array from Cart with matching ID
    async deleteProductFromCart(cartId, productId) {
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            throw `Cart ID ${cartId} is not a valid format`
        }
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            throw `Product ID ${productId} is not a valid format`
        }

        const cart = await cartModel.findById(cartId).exec()
        if (!cart) {
            throw `Cart with ID ${cartId} does not exist`
        }

        const productInCart = cart.products.id(productId)
        if (!productInCart) {
            throw `Product with ID ${productId} does not exist in Cart with ID ${cartId}`
        }
        else {
            productInCart.deleteOne()
        }

        await cart.save()
        return await cartModel.findById(cartId).exec()
    }
}

export default CartManager