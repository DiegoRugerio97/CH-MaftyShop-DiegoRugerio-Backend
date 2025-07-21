// Controller class for sessions
// Imports
import { generateToken } from "../util.js"
import UserDTO from "../DTOs/user.dto.js"
import { usersService } from "../services/index.service.js"
class SessionController {

    async register(req, res) {
        res.status(200).send({ status: 'SUCCESS', message: 'User registered succesfully.' })
    }

    async login(req, res) {
        const user = new UserDTO(req.user)
        const token = generateToken(user, '24h')
        res.cookie('userToken', token, { httpOnly: true }).redirect('/products')
    }

    async current(req, res) {
        const user = req.user.payload
        res.send(user)
    }

    async logout(req, res) {
        res.clearCookie('userToken')
        res.redirect("/login")
    }

    async forgetPassword(req, res) {
        const protocol = req.protocol
        const host = req.hostname
        const port = process.env.PORT
        const ROUTE = '/resetPassword'
        const URL = `${protocol}://${host}:${port}${ROUTE}`

        const email = req.body.email
        const response = await usersService.forgetPasswordProcess(email, URL)
        if (!response) {
            return res.status(404).send({ status: "ERROR", message: "User not found" })
        }
        return res.status(200).send({ status: 'SUCCESS', message: 'Mail has been sent' })
    }


    async resetPassword(req, res) {

        try {
            const newPassword = req.body.password
            const token = req.body.token
            const response = await usersService.resetPassword(newPassword, token)
            res.status(200).send({ status: "SUCCESS", message: response})
        }
        catch (error) {
            res.status(400).send({ status: "ERROR", message:error })
        }
    }

    async failAuthenticated(req, res) {
        res.status(401).send({ status: "ERROR", message: "Invalid credentials" })
    }

    async failRegister(req, res) {
        res.status(409).send({ status: 'ERROR', message: 'User already exists.' })
    }

}

export default SessionController