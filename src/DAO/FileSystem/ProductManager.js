// Cart Manager class
// Manages persistence of carts using file (JSON)
class ProductManager {

    constructor(path) {
        this.products = []
        this.path = path
    }

    async addProduct(title, description, code, price, status, stock, category, thumbnails) {
        try {
            let fileExists = fs.existsSync(this.path)

            if (fileExists) {
                await this.#readProductsFromFile()
            }

            if (this.#codeExists(code)) {
                throw "WARNING: Code already exists."
            }

            let tempId = 1
            let isEmpty = this.products.length == 0
            if (!isEmpty) {
                let previousID = this.products[this.products.length - 1].id
                tempId = previousID + 1
            }

            const productToAdd = {
                id: tempId,
                title: title,
                description: description,
                code: code,
                price: price,
                status: status,
                stock: stock,
                category: category,
                thumbnails: thumbnails,
            }

            this.products.push(productToAdd)

            await this.#writeProductsToFile()
            return {
                message: `INFO: Product with ID ${tempId} and Code ${code} saved succesfully.`,
                product: productToAdd
            }


        } catch (error) {
            throw `ERROR: Couldn't write products - ${error}`
        }
    }

    async deleteProduct(id) {
        try {
            await this.#readProductsFromFile()
            let product = this.products.find(product => product.id === id)
            if (!product) {
                return `WARNING: Product with ID ${id} not found`
            }

            let filteredProducts = this.products.filter(product => product.id != id)
            this.products = filteredProducts
            await this.#writeProductsToFile()
            return `INFO: Product with ID ${id} deleted succesfully`

        } catch (error) {
            throw `ERROR: Couldn't delete product - ${error}`
        }

    }

    async getProductById(id) {
        try {
            await this.#readProductsFromFile()
            let product = this.products.find(product => product.id === id)
            return product ?? `WARNING: Product with ID ${id} not found`
        } catch (error) {
            throw `ERROR: Couldn't load product - ${error}`
        }
    }

    async getProducts() {
        try {
            await this.#readProductsFromFile()
            return this.products
        } catch (error) {
            throw `ERROR: Couldn't load products - ${error}`
        }
    }

    async updateProduct(id, productObject) {
        try {
            await this.#readProductsFromFile()
            let productIndex = this.products.findIndex(product => product.id === id)
            if (productIndex === -1) {
                return `WARNING: Product with ID ${id} not found`
            }

            this.products[productIndex] = { ...this.products[productIndex], ...productObject }
            await this.#writeProductsToFile()
            return `INFO: Product with ID ${id} updated succesfully`

        } catch (error) {
            throw `ERROR: Couldn't update products - ${error}`
        }
    }

    // Private Methods

    #codeExists(code) {
        const productCodes = this.products.map(product => product.code)
        return productCodes.includes(code)
    }

    async #readProductsFromFile() {
        try {
            let fileContent = await fs.promises.readFile(this.path, 'utf-8')
            let products = JSON.parse(fileContent)
            this.products = products
        }
        catch (error) {
            throw error
        }
    }

    async #writeProductsToFile() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products), 'utf-8')
            console.log(`INFO: Total of products is ${this.products.length}`)
        } catch (error) {
            throw `ERROR: File couldn't be written - ${error}`
        }
    }

}

import fs from 'fs'
export default ProductManager