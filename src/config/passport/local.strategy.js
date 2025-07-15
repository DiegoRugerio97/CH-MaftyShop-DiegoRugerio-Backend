// Passport
import { Strategy as LocalStrategy } from "passport-local"
// Services
import UserService from "../../services/user.services.js"
import CartService from "../../services/carts.service.js"
// Utils
import { createHash, isPasswordValid } from '../../util.js'

// User Service
const userService = new UserService()
// Cart Service
const cartService = new CartService()

// Registering
const verifyRegister = async (req, username, password, done) => {
    const { first_name, last_name, email, age } = req.body
    try {
        const userExists = await userService.getUserByEmail(email)

        if (userExists)
            return done(null, false)

        const hashedPassword = createHash(password)

        const cart = await cartService.createCart()

        let user = await userService.createUser({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,
            cart: cart._id
        })
        return done(null, user)
    }
    catch (error) {
        return done('Error creating user: ' + error)
    }
}

// Logging in 
const verifyLogin = async (username, password, done) => {
    try {
        let user = await userService.getUserByEmail(username)
        if (!user) return done(null, false)

        let validCredentials = isPasswordValid(user, password)
        if (!validCredentials) return done(null, false)

        return done(null, user)
    }
    catch (error) {
        return done(error)
    }
}


export const registerLocal = new LocalStrategy({ usernameField: "email", passReqToCallback: true }, verifyRegister);
export const loginLocal = new LocalStrategy({ usernameField: "email" }, verifyLogin);