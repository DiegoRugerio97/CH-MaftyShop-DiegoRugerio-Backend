// Service class for Carts
// Import repository instances
import { cartsRepository, productsRepository } from "../Repositories/index.repository.js"
import CartDTO from "../DTOs/cart.dto.js"
class CartsService {

    // Finds Cart by ID
    async getCartById(cartId) {
        if (!cartsRepository.isIdValid(cartId)) {
            throw `Cart ID ${cartId} is not a valid format`
        }
        const response = await cartsRepository.getCartContentById(cartId)
        if (!response) {
            throw `Cart ${cartId} doesn't exist - Check logs`
        }
        const cartDTO = new CartDTO(response.products)
        const cart = cartDTO.getCartProducts()
        const cartTotal = this.getCartTotal(cart)
        return { cart, cartTotal }
    }

    // Creates Cart in collection
    async createCart() {
        return await cartsRepository.createCart()
    }

    // Stores the ID of the product in the subdocument array or updates it
    async addProductToCart(cartId, productId, productQuantity) {
        if (!cartsRepository.isIdValid(cartId)) {
            throw `Cart ID ${cartId} is not a valid format`
        }
        if (!productsRepository.isIdValid(productId)) {
            throw `Product ID ${productId} is not a valid format`
        }

        const product = await productsRepository.getProductById(productId)
        if (!product) {
            throw `Product ${productId} doesn't exist - Check logs`
        }
        const cart = await cartsRepository.getCartById(cartId)
        if (!cart) {
            throw `Cart ${cartId} doesn't exist - Check logs`
        }

        const productInCart = await cartsRepository.getProductInCart(cart, productId)
        if (!productInCart) {
            return await cartsRepository.addNewProductToCart(cart, productId, productQuantity)
        }
        else {
            return await cartsRepository.addExistingProductToCart(cart, productInCart, productQuantity)
        }
    }


    // Updates Cart with an array of products
    async updateCart(cartId, productsArray) {
        if (!cartsRepository.isIdValid(cartId)) {
            throw `Cart ID ${cartId} is not a valid format`
        }
        if (!Array.isArray(productsArray)) {
            throw `Incorrect body format on ${productsArray}`
        }
        const cart = await cartsRepository.getCartById(cartId)
        if (!cart) {
            throw `Cart ${cartId} doesn't exist - Check logs`
        }
        return await cartsRepository.updateCart(cart, productsArray)
    }

    // Updates the quantity of product in Cart with both matching IDs
    async updateQuantityInCart(cartId, productId, productQuantity) {
        if (!cartsRepository.isIdValid(cartId)) {
            throw `Cart ID ${cartId} is not a valid format`
        }
        if (!productsRepository.isIdValid(productId)) {
            throw `Product ID ${productId} is not a valid format`
        }

        const product = await productsRepository.getProductById(productId)
        if (!product) {
            throw `Product ${productId} doesn't exist - Check logs`
        }
        const cart = await cartsRepository.getCartById(cartId)
        if (!cart) {
            throw `Cart ${cartId} doesn't exist - Check logs`
        }

        const productInCart = await cartsRepository.getProductInCart(cart, productId)
        if (!productInCart) {
            throw `Product with ID ${productId} does not exist in Cart with ID ${cartId}`
        }
        else {
            return await cartsRepository.setExistingProductInCart(cart, productInCart, productQuantity)
        }
    }

    // Deletes the entire product array of a Cart with matching ID
    async deleteCart(cartId) {
        if (!cartsRepository.isIdValid(cartId)) {
            throw `Cart ID ${cartId} is not a valid format`
        }

        const cart = await cartsRepository.getCartById(cartId)
        if (!cart) {
            throw `Cart with ID ${cartId} does not exist`
        }

        return await cartsRepository.deleteCart(cart)
    }

    // Deletes entire product from product Array from Cart with matching ID
    async deleteProductFromCart(cartId, productId) {
        if (!cartsRepository.isIdValid(cartId)) {
            throw `Cart ID ${cartId} is not a valid format`
        }
        if (!productsRepository.isIdValid(productId)) {
            throw `Product ID ${productId} is not a valid format`
        }

        const cart = await cartsRepository.getCartById(cartId)
        if (!cart) {
            throw `Cart ${cartId} doesn't exist - Check logs`
        }

        const productInCart = await cartsRepository.getProductInCart(cart, productId)
        if (!productInCart) {
            throw `Product with ID ${productId} does not exist in Cart with ID ${cartId}`
        }
        return await cartsRepository.deleteProductFromCart(cart, productInCart)
    }

    getCartTotal(cart) {
        const initialValue = 0
        const cartTotal = cart.reduce(
            (total, product) => total + (product.price * product.quantity),
            initialValue)
        return cartTotal
    }
    
    getStockValidation(cart) {
        const availableProducts = []
        const outOfStockProducts = []
        for (const product of cart) {
            if (product.stock >= product.quantity) {
                availableProducts.push({ _id: product.id, quantity: product.quantity })
            }
            else {
                outOfStockProducts.push({ _id: product.id, quantity: product.quantity })
            }
        }
        return { availableProducts, outOfStockProducts }
    }
}

export default CartsService