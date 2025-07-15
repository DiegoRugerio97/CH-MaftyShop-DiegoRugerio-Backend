// Service class for Carts
// Imports
import CartDAO from "../DAOs/Mongo/carts.dao.js "
import ProductsDAO from "../DAOs/Mongo/products.dao.js"

// Cart DAO
const cartDAO = new CartDAO()
// Product DAO
const productsDAO = new ProductsDAO()

class CartsService {

    // Finds Cart by ID
    async getCartById(cartId) {
        if (!cartDAO.isIdValid(cartId)) {
            throw `Cart ID ${cartId} is not a valid format`
        }
        const cart = await cartDAO.getCartContentById(cartId)
        if (!cart) {
            throw `Cart ${cartId} doesn't exist - Check logs`
        }
        return cart.products
    }

    // Creates Cart in collection
    async createCart() {
        return await cartDAO.createCart()
    }

    // Stores the ID of the product in the subdocument array or updates it
    async addProductToCart(cartId, productId, productQuantity) {
        if (!cartDAO.isIdValid(cartId)) {
            throw `Cart ID ${cartId} is not a valid format`
        }
        if (!productsDAO.isIdValid(productId)) {
            throw `Product ID ${productId} is not a valid format`
        }

        const product = await productsDAO.getProductById(productId)
        if (!product) {
            throw `Product ${productId} doesn't exist - Check logs`
        }
        const cart = await cartDAO.getCartById(cartId)
        if (!cart) {
            throw `Cart ${cartId} doesn't exist - Check logs`
        }

        const productInCart = await cartDAO.getProductInCart(cart, productId)
        if (!productInCart) {
            return await cartDAO.addNewProductToCart(cart, product, productQuantity)
        }
        else {
            return await cartDAO.addExistingProductToCart(cart, productInCart, productQuantity)
        }
    }


    // Updates Cart with an array of products
    async updateCart(cartId, productsArray) {
        if (!cartDAO.isIdValid(cartId)) {
            throw `Cart ID ${cartId} is not a valid format`
        }
        if (!Array.isArray(productsArray)) {
            throw `Incorrect body format on ${productsArray}`
        }
        const cart = await cartDAO.getCartById(cartId)
        if (!cart) {
            throw `Cart ${cartId} doesn't exist - Check logs`
        }
        return await cartDAO.updateCart(cart, productsArray)
    }

    // Updates the quantity of product in Cart with both matching IDs
    async updateQuantityInCart(cartId, productId, productQuantity) {
        if (!cartDAO.isIdValid(cartId)) {
            throw `Cart ID ${cartId} is not a valid format`
        }
        if (!productsDAO.isIdValid(productId)) {
            throw `Product ID ${productId} is not a valid format`
        }

        const product = await productsDAO.getProductById(productId)
        if (!product) {
            throw `Product ${productId} doesn't exist - Check logs`
        }
        const cart = await cartDAO.getCartById(cartId)
        if (!cart) {
            throw `Cart ${cartId} doesn't exist - Check logs`
        }

        const productInCart = await cartDAO.getProductInCart(cart, productId)
        if (!productInCart) {
            throw `Product with ID ${productId} does not exist in Cart with ID ${cartId}`
        }
        else {
            return await cartDAO.setExistingProductInCart(cart, productInCart, productQuantity)
        }
    }

    // Deletes the entire product array of a Cart with matching ID
    async deleteCart(cartId) {
        if (!cartDAO.isIdValid(cartId)) {
            throw `Cart ID ${cartId} is not a valid format`
        }

        const cart = await cartDAO.getCartById(cartId)
        if (!cart) {
            throw `Cart with ID ${cartId} does not exist`
        }

        return await cartDAO.deleteCart(cart)
    }

    // Deletes entire product from product Array from Cart with matching ID
    async deleteProductFromCart(cartId, productId) {
        if (!cartDAO.isIdValid(cartId)) {
            throw `Cart ID ${cartId} is not a valid format`
        }
        if (!productsDAO.isIdValid(productId)) {
            throw `Product ID ${productId} is not a valid format`
        }

        const cart = await cartDAO.getCartById(cartId)
        if (!cart) {
            throw `Cart ${cartId} doesn't exist - Check logs`
        }

        const productInCart = await cartDAO.getProductInCart(cart, productId)
        if (!productInCart) {
            throw `Product with ID ${productId} does not exist in Cart with ID ${cartId}`
        }
        return await cartDAO.deleteProductFromCart(cart, productInCart)
    }
}

export default CartsService