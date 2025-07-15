// Passport
import GitHubStrategy from 'passport-github2'
// Services
import CartsService from '../../services/carts.service.js'
import UserService from '../../services/user.services.js'
import { createHash } from '../../util.js'
// ENV
import config from '../config.js'

const userService = new UserService()
const cartService =  new CartsService()

// Github strategy
const verifyRegisterGitHub = async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await userService.getUserByEmail(profile.profileUrl)
        if (!user) {
            const response = await cartService.createCart()
            let newUser = {
                first_name: profile.username,
                last_name: 'default',
                email: profile.profileUrl,
                age: 18,
                password: createHash(config.SECRET),
                cart: response._id
            };
            let result = await userService.createUser(newUser)
            done(null, result);
        }
        else {
            done(null, user);
        }
    }
    catch (error) {
        return done('Error creating user: ' + error)
    }
}

export const registerGitHub = new GitHubStrategy({
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
}, verifyRegisterGitHub)