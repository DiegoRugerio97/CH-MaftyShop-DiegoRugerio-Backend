// Passport
import { Strategy as LocalStrategy } from "passport-local"
// Models
import userModel from '../../DAOs/Models/user.model.js'
import cartModel from '../../DAOs/Models/cart.model.js'
// Utils
import { createHash, isPasswordValid } from '../../util.js'

// Registering
const verifyRegister = async (req, username, password, done) => {
    const { first_name, last_name, email, age } = req.body
    try {
        const userExists = await userModel.findOne({ email }).lean().exec()

        if (userExists)
            return done(null, false)

        const hashedPassword = createHash(password)

        const response = await cartModel.create({})

        let result = await userModel.create({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,
            cart: response._id
        })
        return done(null, result)
    }
    catch (error) {
        return done('Error creating user: ' + error)
    }
}

// Logging in 
const verifyLogin = async (username, password, done) => {
    try {
        let user = await userModel.findOne({ email: username }).lean().exec()
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