// Product Router
// Imports
import { Router } from "express"
import ProductManager from '../ProductManager.js'

// Product Manager 
let filePath = './src/JSON/'
let fileName = 'products.json'
const pm = new ProductManager(filePath+fileName)

// Router
const router = Router()

router.get('/products', async (req, res) => {
    try {
        const products = await pm.getProducts()
        res.status(200).render('home', { products })
    }
    catch (error) {
        res.status(404).send({ 'error': error })
    }
})


router.get('/realtimeproducts', async (req, res) => {
    const app = req.app
    let socketServer = app.get("io")
    socketServer.on('connection', socket => {
        console.log("Cliente conectado")
    })
    try {
        const products = await pm.getProducts()
        res.status(200).render('realTimeProducts',{ products })
    }
    catch (error) {
        res.status(404).send({ 'error': error })
    }
})


export default router;