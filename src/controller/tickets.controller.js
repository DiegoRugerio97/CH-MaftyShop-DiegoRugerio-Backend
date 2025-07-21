// Controller class for Tickets
// Imports
// Carts Service
import { ticketsService } from "../services/index.service.js"

class TicketsController {

    // GET - Gets all tickets assigned to a user
    async getTicketsByUserEmail(req, res) {
        try {
            const userEmail = req.user.payload.email
            const response = await ticketsService.getTicketsByUserEmail(userEmail)
            res.status(200).send({ status: "SUCCESS", response })
        } catch (error) {
            res.status(400).send({ status: "ERROR", error })
        }
    }

    // POST - Creates ticket based on user and cart
    async createTicket(req, res) {
        try {
            const userEmail = req.user.payload.email
            const cartId = req.user.payload.cartId
            const response = await ticketsService.createTicket(userEmail, cartId)
            res.status(200).send({ status: "SUCCESS", response })
        } catch (error) {
            res.status(400).send({ status: "ERROR", error })
        }
    }

}

export default TicketsController