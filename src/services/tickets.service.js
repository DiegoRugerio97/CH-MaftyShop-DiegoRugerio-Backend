// Service class for Tickets
// Import repository instances
import { cartsRepository, ticketsRepository, productsRepository } from "../Repositories/index.repository.js"
// DTOs
import CartDTO from "../DTOs/cart.dto.js"
import TicketDTO from "../DTOs/ticket.dto.js"
// Cart service
import {cartsService} from "./index.service.js"

class TicketsService {

    // Finds Tickets assigned to user by ID
    async getTicketsByUserEmail(userEmail) {
        const response = await ticketsRepository.getTicketsByUserEmail(userEmail)
        const tickets = []
        for (const ticket of response) {
            tickets.push(new TicketDTO(ticket))
        }
        return tickets
    }

    // Stores the ID of the product in the subdocument array or updates it
    async createTicket(userEmail, cartId) {
        const response = await cartsRepository.getCartContentById(cartId)
        const cartDTO = new CartDTO(response.products)
        const cartContent = cartDTO.getCartProducts()
        const cartTotal = cartsService.getCartTotal(cartContent)
        const { availableProducts, outOfStockProducts } = cartsService.getStockValidation(cartContent)

        if (!cartContent.length) {
            throw `Cart is empty`
        }
        if (!availableProducts.length) {
            throw `Unable to create ticket due to lack of stock`
        }

        const ticketObj = {
            products: availableProducts,
            amount: cartTotal,
            purchaser: userEmail
        }

        for (const product of availableProducts) {
            const baseProduct = await productsRepository.getProductById(product._id)
            const newStock = baseProduct.stock - product.quantity
            await productsRepository.updateProduct(product._id, { stock: newStock })
        }

        const ticket = await ticketsRepository.createTicket(ticketObj)
        const cart = await cartsRepository.getCartById(cartId)
        await cartsRepository.updateCart(cart, outOfStockProducts)

        return ticket
    }
}

export default TicketsService
