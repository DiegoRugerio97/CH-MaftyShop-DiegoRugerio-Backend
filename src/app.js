// Main app for server
// Imports
// ENV
import config from './config/config.js'
import { __dirname } from './util.js'
// Express
import express from 'express'
// Routers
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
// Templates
import handlebars from 'express-handlebars'
// Sockets
import { Server } from 'socket.io'
// Mongoose
import mongoose from 'mongoose'
// Express instance
const app = express()

// Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')
// Middleware
// Requests
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// Routes
app.use('/api/products/', productsRouter)
app.use('/api/carts/', cartsRouter)
app.use('/', viewsRouter)
// Public
app.use(express.static(__dirname+'/public'))
// Mongo Atlas connection
const collection = "ecommerce"
mongoose.connect(config.mongoURL,{dbName:collection})
// Port
const PORT = config.port
// Starting server
const httpServer = app.listen(PORT,()=>console.log(`Active server in port ${PORT}`))


// Socket
const socketServer = new Server(httpServer)
// Server Middleware to have it available in routes
app.set('io',socketServer)
