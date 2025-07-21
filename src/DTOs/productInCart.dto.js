// DTO for ProductInCart
export default class ProductInCartDTO {
    constructor(product, quantity) {
        this.id = product._id ?? product.id,
        this.title = product.title,
        this.code= product.code,
        this.price= product.price,
        this.status = product.status,
        this.stock = product.stock,
        this.thumbnails = product.thumbnails
        this.description = product.description
        this.quantity = quantity,
        this.subTotal = quantity*product.price
    }
}