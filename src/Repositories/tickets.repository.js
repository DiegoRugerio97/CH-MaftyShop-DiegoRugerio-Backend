// Repository class for Carts

class TicketsRepository {
    constructor(DAO){ 
        this.ticketsDAO = DAO
    }
    // Creates Cart
    async createTicket(ticketObj) {
        return await this.ticketsDAO.createTicket(ticketObj)
    }

    // Finds Cart by ID
    async getTicketsByUserEmail(userEmail) {
        return await this.ticketsDAO.getTicketsByUserEmail(userEmail)
    }

}

export default TicketsRepository