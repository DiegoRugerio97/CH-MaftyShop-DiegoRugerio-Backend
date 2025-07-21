import mongoose from 'mongoose'

const ticketCollection = 'tickets'

const productInTicketchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required:true
    },
    quantity: {
        type: Number,
        required: true
    }
})

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        default: () => {
            return Math.random().toString(36).substring(2, 10).toUpperCase();
        }
    },
    products: {
        type: [productInTicketchema],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    },
}, {timestamps : {createdAt: true}})

const ticketModel = mongoose.model(ticketCollection, ticketSchema)
export default ticketModel 