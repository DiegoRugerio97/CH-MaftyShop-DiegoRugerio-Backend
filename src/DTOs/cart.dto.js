// DTO for ProductInCart

// ProductInCart DTO
import ProductInCartDTO from "./productInCart.dto.js"

export default class CartDTO {
    constructor(productsArray) {
        this.cart = []
        for (const product of productsArray) {
            const key = Object.keys(product)[0]
            this.cart.push(new ProductInCartDTO(product[key], product.quantity))
        }
    }

    getCartProducts(){
        return this.cart
    }

}