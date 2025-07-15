// Controller class for sessions
// Imports
import { generateToken } from "../util.js"
class SessionController {

    async register(req, res) {
        res.status(200).send({ status: 'success', message: 'User registered succesfully.' })
    }

    async login(req, res) {
        let { ...user } = req.user
        delete user.password
        const token = generateToken(user)
        res.cookie('userToken', token, { httpOnly: true }).redirect('/products')
    }

    async current(req, res) {
        res.send(req.user)
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