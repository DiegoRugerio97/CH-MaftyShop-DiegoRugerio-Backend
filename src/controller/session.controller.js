// Controller class for sessions
// Imports
import { generateToken } from "../util.js"
import UserDTO from "../DTOs/user.dto.js"
class SessionController {

    async register(req, res) {
        res.status(200).send({ status: 'success', message: 'User registered succesfully.' })
    }

    async login(req, res) {
        const user = new UserDTO(req.user)
        const token = generateToken(user)
        res.cookie('userToken', token, { httpOnly: true }).redirect('/products')
    }

    async current(req, res) {
        const user = new UserDTO(req.user.payload)
        res.send(user)
    }

    async logout(req, res) {
        res.clearCookie('userToken')
        res.redirect("/login")
    }

    async failLogin(req, res) {
        res.status(401).send({ status: "ERROR", message: "Invalid credentials" })
    }

    async failRegister(req, res) {
        res.status(409).send({ status: 'ERROR', message: 'User already exists.' })
    }
}

export default SessionController