// DTO for TIckets

export default class TicketDTO{
    constructor(ticketObj){
        this.id = ticketObj._id ?? ticketObj.id,
        this.products = ticketObj.products,
        this.amount = ticketObj.amount,
        this.purchaser = ticketObj.purchaser,
        this.code = ticketObj.code,
        this.createdAt = ticketObj.createdAt
    }
}