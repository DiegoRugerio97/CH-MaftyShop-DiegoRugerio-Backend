// Main app for server
// Imports
// ENV
import config from './config/config.js'
import { __dirname } from './util.js'
// Express
import express from 'express'
// Routers
import mainRouter from './routes/index.router.js'
import viewsRouter from './routes/views.router.js'

// Templates
import handlebars from 'express-handlebars'
// Sockets
import { Server } from 'socket.io'
// Mongoose
import mongoose from 'mongoose'
// Passport
import initializedPassport from './config/passport/passport.config.js'
import cookieParser from 'cookie-parser'
import passport from 'passport'
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
// Passport and cookies
app.use(cookieParser())
initializedPassport()
app.use(passport.initialize())
// Routes
app.use('/', viewsRouter)
app.use('/api',mainRouter)
// Public
app.use(express.static(__dirname+'/public'))
// Port
const PORT = config.PORT
// Starting server
const httpServer = app.listen(PORT,()=>console.log(`Active server in port ${PORT}`))

// Socket
const socketServer = new Server(httpServer)
// Server Middleware to have it available in routes
app.set('io',socketServer)
