// Passport
import passport from "passport"
// Strategies
import { registerLocal, loginLocal } from "./local.strategy.js"
import { registerGitHub } from "./github.strategy.js"
import { jwt } from "./jwt.strategy.js"
// Service
import UserService from "../../services/user.services.js"

// User Service
const userService = new UserService()

// Initializing passport strategies
const initializedPassport = () => {

    passport.use("login", loginLocal)
    passport.use("register", registerLocal)
    passport.use("github", registerGitHub)
    passport.use("jwt", jwt)

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await userService.getUserById(id)
        delete user.password
        done(null, user)
    })
}

export default initializedPassport