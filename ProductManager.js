class ProductManager {

    constructor(path) {
        this.products = []
        this.path = path
    }

    async addProduct(title, description, price, thumbnail, code, stock) {

        let fileExists = fs.existsSync(this.path)

        if (arguments.length !== 6) {
            return "WARNING: Incorrect parameters - title, description, price, thumbnail, code, stock."
        }

        try {

            if (fileExists) {
                await this.#readProductsFromFile()
            }

            if (this.#codeExists(code)) {
                return "WARNING: Code already exists."
            }

            let tempId = 1
            let isEmpty = this.products.length == 0
            if (!isEmpty) {
                let previousID = this.products[this.products.length - 1].id
                tempId = previousID + 1
            }

            this.products.push({
                title: title,
                description: description,
                thumbnail: thumbnail,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock,
                id: tempId
            })

            await this.#writeProductsToFile()
            return `INFO: Product with ID ${tempId} and Code ${code} saved succesfully.`

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
            return product ?? "WARNING: Product not found"
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

const fs = require('fs')

// ProductManager instance with file system
let filePath = './'
let fileName = 'products.json'
const productManager = new ProductManager(filePath+fileName)

const logAsync = (promise) => {
    promise
        .then(result => console.log(result))
        .catch(e => console.log(e))
}

// Add
// logAsync(productManager.addProduct("ProductoPrueba", "Prueba", 200, "Imagen.png", "CODE005", 10))

// Get
// logAsync(productManager.getProducts())

// Get by ID
// logAsync(productManager.getProductById(9))

// Delete
// logAsync(productManager.deleteProduct(11))

// Update
// logAsync(productManager.updateProduct(10, {"title":"ProductoPruebaUpdated"}))