// Product DAO using Mongo persistence
// Imports
import ticketModel from '../Mongo/Models/ticket.model.js'
import mongoose from 'mongoose'

class TicketsDAO {

    // Finds by ID
    async getTicketsByUserEmail(userEmail) {
        try {
            const ticket= await ticketModel.find({purchaser:userEmail}).sort({_id:-1}).lean().exec()
            return ticket
        } catch (error) {
            console.log({ error })
            return null
        }
    }

    // Creates document in Mongo
    async createTicket(ticketObj) {
        try {
            return await ticketModel.create(ticketObj)
        } catch (error) {
            console.log({ error })
            throw error
        }
    }
}

export default TicketsDAO