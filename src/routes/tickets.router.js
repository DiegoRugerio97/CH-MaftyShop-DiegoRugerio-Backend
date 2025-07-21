// Ticket Router
// Imports
import { Router } from "express"
import TicketsController from "../controller/tickets.controller.js"
import { authorize, jwtAuthenticationRedirect } from "./middleware.js"

// Router
const router = Router()
// Cart Controller
const ticketsController = new TicketsController()
// Base middleware array
const mainMiddlewares = [jwtAuthenticationRedirect('/api/sessions/failAuthenticated'), authorize(["USER"])]
// GET - User ID - Gets all tickets assigned to a user
router.get('/', mainMiddlewares, ticketsController.getTicketsByUserEmail)
// POST - User ID  - Creates ticket based on user
router.post('/checkout', mainMiddlewares, ticketsController.createTicket)

export default router