// Repository class for Products 

class ProductsRepository {

    constructor(DAO){
        this.productsDAO = DAO
    }
    // Finds all products with pagination
    async getProducts(limit, pageNumber, sort, queryField, queryVal) {
        return await this.productsDAO.getProducts(limit, pageNumber, sort, queryField, queryVal)
    }

    // Find by ID
    async getProductById(productId) {
        return await this.productsDAO.getProductById(productId)
    }

    // Creates product
    async addProduct(productObj) {
        return await this.productsDAO.addProduct(productObj)
    }

    // Updates product
    async updateProduct(productId, obj) {
        return await this.productsDAO.updateProduct(productId, obj)
    }

    // Deletes document by ID
    async deleteProduct(productId) {
        return await this.productsDAO.deleteProduct(productId)
    }

    // Validates ID depending on persistence
    isIdValid(productId) {
        return this.productsDAO.isIdValid(productId)
    }
}

export default ProductsRepository