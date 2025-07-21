// Factory for DAOs
// ENV
import config from "../../config/config.js"
// Imports
import mongoose from "mongoose"

// DAOs
export let CartsDAO
export let ProductsDAO
export let UsersDAO
export let TicketsDAO

// Reads desired persistence from ENV variables
const PERSISTENCE = config.PERSISTENCE
switch(PERSISTENCE){
    case "MONGODB":
        // Mongo Atlas connection
        const collection = "ecommerce"
        mongoose.connect(config.MONGO_URL,{dbName:collection})
        const {default:CartsMongo} =  await import("./Mongo/carts.dao.js")
        CartsDAO = CartsMongo
        const {default:ProductsMongo} =  await import("./Mongo/products.dao.js")
        ProductsDAO = ProductsMongo
        const {default:UsersMongo} =  await import("./Mongo/users.dao.js")
        UsersDAO = UsersMongo
        const {default:TicketsMongo} =  await import("./Mongo/tickets.dao.js")
        TicketsDAO = TicketsMongo
        break
}