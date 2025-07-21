// DTO for products

export default class ProductDTO{
    constructor(productObj){
        this.id = productObj.id ?? productObj._id,
        this.title = productObj.title,
        this.description = productObj.description,
        this.code = productObj.code,
        this.price = productObj.price,
        this.status =  productObj.status,
        this.stock = productObj.stock, 
        this.category = productObj.category,
        this.thumbnails = productObj.thumbnails
    }
}