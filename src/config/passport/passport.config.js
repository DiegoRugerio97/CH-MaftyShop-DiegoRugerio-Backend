// Passport
import passport from "passport"
// Strategies
import { registerLocal, loginLocal } from "./local.strategy.js"
import { registerGitHub } from "./github.strategy.js"
import { jwt } from "./jwt.strategy.js"
// Model
import userModel from '../../DAOs/Models/user.model.js'

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
        const user = await userModel.findById(id)
        delete user.password
        done(null, user)
    })
}

export default initializedPassport