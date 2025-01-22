// Main app for server
// Imports
import express from 'express'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
// Express instance
const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/products/', productsRouter)
app.use('/api/carts/', cartsRouter)

// Port
const PORT = 8080

// Starting server
app.listen(PORT,()=>console.log("Active server in port 8080"))

