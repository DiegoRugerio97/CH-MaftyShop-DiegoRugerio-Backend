import express from 'express'
import ProductManager from './ProductManager.js'

const app = express()
let filePath = './src/'
let fileName = 'products.json'
const pm = new ProductManager(filePath+fileName)



app.get('/products', async (req, res)=>{
    try {
        const products = await pm.getProducts()
        res.send(products)
    } catch (error) {
        res.send(error)
    }
})

app.get('/products/:pId', async (req, res)=>{
    try {
        let productId = parseInt(req.params.pId)
        const product = await pm.getProductById(productId)
        res.send(product)
    } catch (error) {
        res.send(error)
    }
})

app.listen(8080,()=>console.log("Active server in port 8080"))

