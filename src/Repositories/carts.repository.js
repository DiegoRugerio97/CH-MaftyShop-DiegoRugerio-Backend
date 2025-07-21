// Repository class for Carts

class CartsRepository {
    constructor(DAO){ 
        this.cartDAO = DAO
    }
    // Creates Cart
    async createCart() {
        return await this.cartDAO.createCart()
    }

    // Finds Cart by ID
    async getCartContentById(cartId) {
        return await this.cartDAO.getCartContentById(cartId)
    }

    // Finds Cart by ID
    async getCartById(cartId) {
        return await this.cartDAO.getCartById(cartId)
    }

    // Finds specific product in the provided cart
    async getProductInCart(cart, productId) {
        return await this.cartDAO.getProductInCart(cart, productId)
    }

    // Adds the ID of the product
    async addNewProductToCart(cart, product, productQuantity) {
        return await this.cartDAO.addNewProductToCart(cart, product, productQuantity)
    }

    // Adds to the existing product
    async addExistingProductToCart(cart, productInCart, productQuantity) {
        return await this.cartDAO.addExistingProductToCart(cart, productInCart, productQuantity)
    }

    // Updates Cart with an array of products
    async updateCart(cartId, productsArray) {
        return await this.cartDAO.updateCart(cartId, productsArray)
    }

    // Sets to the existing product
    async setExistingProductInCart(cart, productInCart, productQuantity) {
        return await this.cartDAO.setExistingProductInCart(cart, productInCart, productQuantity)
    }

    // Deletes the entire product array of a Cart with matching ID
    async deleteCart(cart) {
        return await this.cartDAO.deleteCart(cart)
    }

    // Deletes entire product from cart 
    async deleteProductFromCart(cart, productInCart) {
        return await this.cartDAO.deleteProductFromCart(cart, productInCart)
    }

    // Validates ID depending on persistence
    isIdValid(cartId) {
        return this.cartDAO.isIdValid(cartId)
    }
}

export default CartsRepository