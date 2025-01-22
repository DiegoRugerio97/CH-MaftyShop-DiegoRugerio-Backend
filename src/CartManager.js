// Cart Manager class
// Manages persistence of carts using file (JSON)
class CartManager {

    constructor(path) {
        this.carts = []
        this.path = path
    }

    async createCart() {

        let fileExists = fs.existsSync(this.path)

        try {

            if (fileExists) {
                await this.#readCartsFromFile()
            }

            let tempId = 1
            let isEmpty = this.carts.length == 0
            if (!isEmpty) {
                let previousID = this.carts[this.carts.length - 1].id
                tempId = previousID + 1
            }

            this.carts.push({
                products: [],
                id: tempId
            })

            await this.#writeCartsToFile()
            return `INFO: Cart with ID ${tempId} created succesfully.`

        } catch (error) {
            throw `ERROR: Couldn't create cart - ${error}`
        }
    }

    async deleteCart(id) {
        try {
            await this.#readCartsFromFile()
            let cart = this.carts.find(cart => cart.id === id)
            if (!cart) {
                return `WARNING: Cart with ID ${id} not found`
            }

            let filteredCarts = this.carts.filter(cart => cart.id != id)
            this.carts = filteredCarts
            await this.#writeCartsToFile()
            return `INFO: Cart with ID ${id} deleted succesfully`

        } catch (error) {
            throw `ERROR: Couldn't delete cart - ${error}`
        }

    }

    async getCartById(id) {
        try {
            await this.#readCartsFromFile()
            let cart = this.carts.find(cart => cart.id === id)
            if(cart !== undefined){
                return cart.products
            }  
            else{
                return "WARNING: Cart not found"
            } 
        } catch (error) {
            throw `ERROR: Couldn't load cart - ${error}`
        }
    }


    async addProductToCart(cartId, productId, quantity) {
        try {
            await this.#readCartsFromFile()
            let cartIndex = this.carts.findIndex(cart => cart.id === cartId)
            if (cartIndex === -1) {
                return `WARNING: Cart with ID ${cartId} not found`
            }
            
            let productIndex = this.carts[cartIndex].products.findIndex(product => product.productId === productId)

            if (productIndex === -1) {
                let productInCart = {
                    productId: productId,
                    quantity: quantity
                }
                this.carts[cartIndex].products.push(productInCart)
            }
            else{
                let newQuantity = this.carts[cartIndex].products[productIndex].quantity + quantity
                this.carts[cartIndex].products[productIndex].quantity = newQuantity
            }
            await this.#writeCartsToFile()
            return `INFO: ${quantity} units of Product ${productId} added succesfully to Cart with ID ${cartId}`


        } catch (error) {
            throw `ERROR: Couldn't add product to cart - ${error}`
        }
    }

    // Private Methods

    async #readCartsFromFile() {
        try {
            let fileContent = await fs.promises.readFile(this.path, 'utf-8')
            let carts = JSON.parse(fileContent)
            this.carts = carts
        }
        catch (error) {
            throw error
        }
    }

    async #writeCartsToFile() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts), 'utf-8')
            console.log(`INFO: Total of carts is ${this.carts.length}`)
        } catch (error) {
            throw `ERROR: File couldn't be written - ${error}`
        }
    }

}

import fs from 'fs'
export default CartManager