// Cart DAO with Mongo DB persistence
// Imports
import cartModel from './Models/cart.model.js'
import mongoose from 'mongoose'

class CartDAO {

    // Creates Cart in collection
    async createCart() {
        try {
            return await cartModel.create({})
        } catch (error) {
            console.log({ error })
            return null
        }
    }

    // Finds Cart by ID, populating each product in the cart
    async getCartContentById(cartId) {
        try {
            return await cartModel.findById(cartId).populate('products._id').lean()
        } catch (error) {
            console.log({ error })
            return null
        }
    }

    // Finds Cart by ID
    async getCartById(cartId) {
        try {
            return await cartModel.findById(cartId)
        } catch (error) {
            console.log({ error })
            return null
        }
    }

    // Finds specific product in the provided cart
    async getProductInCart(cart, productId) {
        try {
            return cart.products.id(productId)
        } catch {
            console.log({ error })
            return null
        }
    }

    // Adds the ID of the product in the subdocument array 
    async addNewProductToCart(cart, productId, productQuantity) {
        try {
            cart.products.addToSet({ _id: productId, quantity: productQuantity })
            await cart.save()
            return cart
        } catch {
            console.log({ error })
            return null
        }
    }

    // Adds to the existing product in the subdocument array 
    async addExistingProductToCart(cart, productInCart, productQuantity) {
        try {
            productInCart.quantity += productQuantity
            await cart.save()
            return cart
        } catch {
            console.log({ error })
            return null
        }
    }

    // Updates Cart with an array of products + internal Mongoose validations
    async updateCart(cartId, productsArray) {
        try {
            const cart = await cartModel.findById(cartId).exec()
            cart.products = productsArray
            await cart.save()
            return cart
        } catch {
            console.log({ error })
            return null
        }
    }

    // Adds to the existing product in the subdocument array 
    async setExistingProductInCart(cart, productInCart, productQuantity) {
        try {
            productInCart.quantity = productQuantity
            await cart.save()
            return cart
        } catch {
            console.log({ error })
            return null
        }
    }

    // Deletes the entire product array of a Cart with matching ID
    async deleteCart(cart) {
        try {
            cart.products = []
            await cart.save()
            return cart
        } catch {
            console.log({ error })
            return null
        }
    }

    // Deletes entire product from product Array from Cart with matching ID
    async deleteProductFromCart(cart, productInCart) {
        try {
            productInCart.deleteOne()
            await cart.save()
            return cart
        } catch {
            console.log({ error })
            return null
        }
    }

    isIdValid(cartId) {
        return mongoose.Types.ObjectId.isValid(cartId)
    }
}

export default CartDAO